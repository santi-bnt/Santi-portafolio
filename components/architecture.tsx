import type { ArchitectureNode } from "@/data/projects";

export function Architecture({ nodes, compact = false }: { nodes: ArchitectureNode[]; compact?: boolean }) {
  return <ol className={`architecture ${compact ? "compact" : ""}`} aria-label="System architecture">{nodes.map((node, i) => <li className={`${node.planned ? "planned-node" : ""} ${node.branchStart ? "branch-start" : ""}`} key={node.title}><span className="architecture-number">{String(i + 1).padStart(2, "0")}</span><div><strong>{node.title}</strong><p>{node.detail}</p>{node.planned && <span className="planned-label">Planned</span>}</div>{i < nodes.length - 1 && !nodes[i + 1].branchStart && <span className="architecture-arrow" aria-hidden="true">↓</span>}</li>)}</ol>;
}
