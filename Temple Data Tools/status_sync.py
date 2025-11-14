from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Mapping, Optional

import requests


CHRONOLOGY_URL = "https://churchofjesuschristtemples.org/temples/chronology/"
SECTION_LABELS = {
    "dedicated": "Dedicated",
    "construction": "Under Construction",
    "announced": "Announced",
}
FOOTNOTE_MARKERS = "*†‡§"


@dataclass
class TempleStatus:
    name: str
    status: str
    detail: str
    noted_by: str | None
    source_section: str

    def to_dict(self) -> Dict[str, str]:
        data = {
            "status": self.status,
            "detail": self.detail,
            "source_section": self.source_section,
        }
        if self.noted_by:
            data["noted_by"] = self.noted_by
        return data


def _fetch_html(url: str = CHRONOLOGY_URL) -> str:
    headers = {
        "User-Agent": "TempleTrackerStatusBot/1.0 (+https://github.com/)",
        "Cache-Control": "no-cache",
    }
    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()
    return response.text


class ChronologyParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_table = False
        self.table_depth = 0
        self.current_section: Optional[str] = None
        self.rows: List[Dict[str, object]] = []
        self.current_row: Optional[List[Dict[str, object]]] = None
        self.current_is_header = False
        self.current_cell_attrs: Optional[Dict[str, str]] = None
        self.current_text_parts: Optional[List[str]] = None
        self.skip_depth = 0

    def handle_starttag(self, tag: str, attrs) -> None:
        attrs_dict = {name: value for name, value in attrs}
        if tag == "table":
            classes = attrs_dict.get("class", "")
            class_list = [item.strip() for item in classes.split()] if classes else []
            if "compact" in class_list:
                self.in_table = True
                self.table_depth = 1
                return
            if self.in_table:
                self.table_depth += 1
                return

        if not self.in_table:
            return

        if tag == "table":
            self.table_depth += 1
            return

        if tag == "h3":
            section_id = attrs_dict.get("id")
            if section_id in SECTION_LABELS:
                self.current_section = SECTION_LABELS[section_id]
            else:
                self.current_section = None
            return

        if tag == "tr":
            self.current_row = []
            self.current_is_header = False
            return

        if tag in {"td", "th"}:
            if tag == "th":
                self.current_is_header = True
            self.current_cell_attrs = attrs_dict
            self.current_text_parts = []
            return

        if tag == "sup" and self.current_text_parts is not None:
            self.skip_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "table" and self.in_table:
            self.table_depth -= 1
            if self.table_depth == 0:
                self.in_table = False
            return

        if not self.in_table:
            return

        if tag == "tr":
            if self.current_row is not None:
                self.rows.append(
                    {
                        "section": self.current_section,
                        "is_header": self.current_is_header,
                        "cells": self.current_row,
                    }
                )
            self.current_row = None
            self.current_is_header = False
            return

        if tag in {"td", "th"} and self.current_text_parts is not None:
            text = "".join(self.current_text_parts).strip()
            normalized = " ".join(text.split())
            if self.current_row is not None:
                self.current_row.append(
                    {"text": normalized, "attrs": self.current_cell_attrs or {}}
                )
            self.current_text_parts = None
            self.current_cell_attrs = None
            return

        if tag == "sup" and self.skip_depth:
            self.skip_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.current_text_parts is not None and self.skip_depth == 0:
            self.current_text_parts.append(data)

    def handle_entityref(self, name: str) -> None:
        if self.current_text_parts is not None and self.skip_depth == 0:
            self.current_text_parts.append(unescape(f"&{name};"))

    def handle_charref(self, name: str) -> None:
        if self.current_text_parts is not None and self.skip_depth == 0:
            self.current_text_parts.append(unescape(f"&#{name};"))


def scrape_statuses(html: str) -> Dict[str, TempleStatus]:
    parser = ChronologyParser()
    parser.feed(html)

    statuses: Dict[str, TempleStatus] = {}
    for row in parser.rows:
        section = row["section"]
        if section not in SECTION_LABELS.values():
            continue
        if row["is_header"]:
            continue
        cells = row["cells"]  # type: ignore[assignment]
        if not cells:
            continue
        first_cell = cells[0]
        if first_cell["attrs"].get("colspan"):
            continue
        index_text = first_cell["text"]
        if not index_text.isdigit():
            continue
        if len(cells) < 2:
            continue

        name = cells[1]["text"].rstrip(FOOTNOTE_MARKERS).strip()
        detail = cells[2]["text"] if len(cells) > 2 else ""
        noted_by = cells[3]["text"] if len(cells) > 3 else ""

        statuses[name] = TempleStatus(
            name=name,
            status=section,  # type: ignore[arg-type]
            detail=detail,
            noted_by=noted_by or None,
            source_section=section,  # type: ignore[arg-type]
        )

    return statuses


def _load_json(path: Path) -> Mapping:
    if not path.exists():
        return {}
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def _load_local_names(path: Path) -> List[str]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as source:
        data = json.load(source)
    return sorted(item["name"] for item in data if "name" in item)


def _detect_status_changes(
    previous: Mapping[str, Mapping[str, str]], current: Mapping[str, TempleStatus]
) -> Dict[str, List[Dict[str, str]]]:
    newly_seen: List[Dict[str, str]] = []
    removed: List[str] = []
    changed: List[Dict[str, str]] = []

    for name, info in current.items():
        past = previous.get(name)
        if not past:
            newly_seen.append(
                {"name": name, "status": info.status, "detail": info.detail}
            )
            continue

        if past.get("status") != info.status or past.get("detail") != info.detail:
            changed.append(
                {
                    "name": name,
                    "previous_status": past.get("status"),
                    "previous_detail": past.get("detail"),
                    "current_status": info.status,
                    "current_detail": info.detail,
                }
            )

    for name in previous.keys():
        if name not in current:
            removed.append(name)

    return {
        "new_temples": newly_seen,
        "removed_temples": removed,
        "status_changes": changed,
    }


def _write_json(path: Path, payload: Mapping) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as target:
        json.dump(payload, target, indent=2, ensure_ascii=False)


def run_sync(
    local_list_path: Path,
    cache_path: Path,
    report_path: Path,
    html: Optional[str] = None,
) -> Dict[str, object]:
    html = html or _fetch_html()
    statuses = scrape_statuses(html)
    remote_names = set(statuses.keys())

    local_names = set(_load_local_names(local_list_path))
    cache_payload = _load_json(cache_path)
    previous_statuses = cache_payload.get("temples", {})

    diff = _detect_status_changes(previous_statuses, statuses)
    missing_locally = sorted(remote_names - local_names)
    missing_from_remote = sorted(local_names - remote_names)

    generated_at = datetime.now(timezone.utc).isoformat()
    cache_data = {
        "generated_at": generated_at,
        "source": CHRONOLOGY_URL,
        "temples": {name: info.to_dict() for name, info in statuses.items()},
    }
    _write_json(cache_path, cache_data)

    report = {
        "generated_at": generated_at,
        "source": CHRONOLOGY_URL,
        "counts": {
            "remote": len(statuses),
            "local": len(local_names),
            "new_remote_temples": len(diff["new_temples"]),
            "status_changes": len(diff["status_changes"]),
        },
        "remote_not_in_local": missing_locally,
        "local_not_on_remote": missing_from_remote,
        **diff,
    }
    _write_json(report_path, report)

    return report


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Scrape the chronology page and compare temple statuses with the local list."
        )
    )
    parser.add_argument(
        "--local-list",
        dest="local_list",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "temples_with_coords.json",
        help="Path to the JSON file that contains the local list of temples.",
    )
    parser.add_argument(
        "--cache",
        dest="cache",
        type=Path,
        default=Path(__file__).with_name("status_cache.json"),
        help="Location for the cached statuses.",
    )
    parser.add_argument(
        "--report",
        dest="report",
        type=Path,
        default=Path(__file__).with_name("status_report.json"),
        help="Where to write the summary report.",
    )

    args = parser.parse_args()

    report = run_sync(
        local_list_path=args.local_list,
        cache_path=args.cache,
        report_path=args.report,
    )

    print(
        f"Fetched {report['counts']['remote']} remote entries. "
        f"{report['counts']['new_remote_temples']} new, "
        f"{report['counts']['status_changes']} changed statuses."
    )

    if report["remote_not_in_local"]:
        print(
            "\nTemples missing from the local list:\n - "
            + "\n - ".join(report["remote_not_in_local"])
        )

    if report["local_not_on_remote"]:
        print(
            "\nLocal temples not found on the chronology page:\n - "
            + "\n - ".join(report["local_not_on_remote"])
        )

    if report["status_changes"]:
        print("\nStatus changes detected:")
        for change in report["status_changes"]:
            print(
                f" - {change['name']}: {change['previous_status']} -> {change['current_status']}"
            )


if __name__ == "__main__":
    main()
