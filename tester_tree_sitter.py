import os
import sys
from pathlib import Path

import yaml

import kai.logging.logging as kai_logging
from kai.analyzer import AnalyzerLSP

PWD = Path(__file__).parent

if input("rebuild kai-analyzer? ") == "y":
    os.system("make build-kai-analyzer")

if input("rebuild generic-external-provider? ") == "y":
    os.system(
        "cd /home/jonah/Projects/github.com/JonahSussman/analyzer-lsp/external-providers/generic-external-provider && sh /home/jonah/Projects/github.com/JonahSussman/analyzer-lsp/external-providers/generic-external-provider/build.sh"
    )

# ./kai_analyzer_rpc/kai-analyzer
# --rules /home/jonah/Projects/github.com/konveyor/rulesets/default/generated/cloud-readiness
# --lspServerPath /home/jonah/Projects/github.com/konveyor-ecosystem/kai-jonah/example/analysis/jdtls/bin/jdtls
# --bundles /home/jonah/Projects/github.com/konveyor-ecosystem/kai-jonah/example/analysis/bundle.jar
# --source-directory /home/jonah/Projects/github.com/konveyor-ecosystem/coolstore

kai_logging.init_logging(
    log_level="TRACE",
    file_log_level="TRACE",
    log_dir_path=PWD / "tester_tree_sitter.log",
)

print("Creating AnalyzerLSP", file=sys.stderr)

analyzer = AnalyzerLSP(
    analyzer_lsp_server_binary=PWD / "kai_analyzer_rpc/kai-analyzer",
    repo_directory=Path(
        "/home/jonah/Projects/github.com/konveyor-ecosystem/coolstore"
    ).resolve(),
    rules=[
        # Path("/home/jonah/Projects/github.com/konveyor/rulesets/default/generated/").resolve(),
        Path(
            "/home/jonah/Projects/github.com/konveyor-ecosystem/kai-jonah/zzz/"
        ).resolve(),
    ],
    java_bundles=[
        Path(
            "/home/jonah/Projects/github.com/konveyor-ecosystem/kai-jonah/example/analysis/bundle.jar"
        ).resolve()
    ],
    analyzer_lsp_path=Path(
        "/home/jonah/Projects/github.com/konveyor-ecosystem/kai-jonah/example/analysis/jdtls/bin/jdtls"
    ).resolve(),
    dep_open_source_labels_path=None,
    excluded_paths=None,
)

print("Running AnalyzerLSP", file=sys.stderr)

output = analyzer.run_analyzer_lsp(
    label_selector="",
    # label_selector="(konveyor.io/target=cloud-readiness || konveyor.io/target=jakarta-ee || konveyor.io/target=jakarta-ee8 || konveyor.io/target=jakarta-ee9 || konveyor.io/target=quarkus)",
    included_paths=[],
    incident_selector="",
    scoped_paths=None,
)

analyzer.stop()

print("Printing results", file=sys.stderr)

with open("tester_tree_sitter.yaml", "w") as f:
    if output is None:
        f.write("output is None")
    else:
        f.write(yaml.dump(output.model_dump()))
