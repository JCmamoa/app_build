/**
 * Backend Architecture Interactive Switcher
 * Presents detailed architectural diagrams, performance guarantees, and tech stacks
 * across four enterprise paradigms.
 */

export const ARCHITECTURE_DATA = {
  microservices: {
    title: 'Microservices & Container Orchestration',
    description: 'Autonomous, decoupled micro-domains running on managed Kubernetes (EKS/GKE). Zero-downtime canary deployments, Istio service mesh, and gRPC inter-service communication.',
    features: [
      'Resilient fault isolation with Circuit Breaker patterns',
      'Automated Horizontal Pod Autoscaling (HPA) under surge loads',
      'Unified distributed tracing with OpenTelemetry and Jaeger',
      'Sub-15ms inter-service latency via binary gRPC protocols'
    ],
    diagram: [
      { name: 'Cloudflare Edge / Global API Gateway', type: 'Ingress' },
      { name: 'Kong / Envoy Mesh Routing Layer', type: 'Mesh' },
      { name: 'Core Microservices (Auth, Order, Billing)', type: 'Kubernetes Pods' },
      { name: 'Decoupled Read/Write Replica Stores', type: 'Database' }
    ],
    tags: ['Kubernetes', 'Docker', 'Envoy', 'gRPC', 'Go', 'Node.js']
  },
  eventdriven: {
    title: 'Event-Driven & Streaming Backends',
    description: 'High-throughput asynchronous message bus architectures for real-time analytics, order processing, and audit logs with guaranteed at-least-once or exactly-once delivery.',
    features: [
      'Apache Kafka & RabbitMQ event broker clustering',
      'Asynchronous pub/sub with backpressure management',
      'Event sourcing and CQRS data segregation',
      'Over 250,000 sustained events/sec processing capability'
    ],
    diagram: [
      { name: 'Event Producers (Clients & Webhooks)', type: 'Producers' },
      { name: 'Kafka Cluster / Partitioned Topics', type: 'Stream Broker' },
      { name: 'Consumer Worker Groups (Auto-scaling)', type: 'Workers' },
      { name: 'Elasticsearch & TimescaleDB Sink', type: 'Storage' }
    ],
    tags: ['Apache Kafka', 'RabbitMQ', 'Redis Streams', 'Python', 'Rust']
  },
  serverless: {
    title: 'Serverless & Edge Compute Engines',
    description: 'Instant zero-cold-start execution distributed across 300+ global edge locations. True pay-per-execution scaling with near-zero idle infrastructure costs.',
    features: [
      'Edge functions with sub-5ms cold-start latency',
      'Stateless execution models with distributed KV caches',
      'Automatic multi-region redundancy and failover',
      'Direct client-to-edge asset streaming and dynamic SSR'
    ],
    diagram: [
      { name: 'Visitor Anycast DNS Routing', type: 'DNS' },
      { name: 'Cloudflare Workers / AWS Lambda@Edge', type: 'Compute' },
      { name: 'Global Edge Key-Value & Object Store', type: 'Storage' },
      { name: 'Origin Fallback Resiliency Pipeline', type: 'Failover' }
    ],
    tags: ['AWS Lambda', 'Cloudflare Workers', 'TypeScript', 'D1', 'Vercel']
  },
  distributed: {
    title: 'High-Throughput Distributed Data Systems',
    description: 'Globally consistent ACID databases, multi-region replication clusters, and multi-tier memory caching engineered for zero data loss and mission-critical uptime.',
    features: [
      'Active-Active geo-distributed replication topologies',
      'Multi-layer Redis & Valkey sub-millisecond in-memory cache',
      'Automated automated snapshot backups and point-in-time recovery',
      'Partition tolerance with Raft / Paxos consensus models'
    ],
    diagram: [
      { name: 'Intelligent Query Router & Connection Pool', type: 'Proxy' },
      { name: 'Multi-Region In-Memory Caching (Redis)', type: 'L1 Cache' },
      { name: 'Primary Distributed Cluster (PostgreSQL / CockroachDB)', type: 'Storage' },
      { name: 'Cross-Region Hot Standby Replicas', type: 'DR Mirror' }
    ],
    tags: ['PostgreSQL', 'CockroachDB', 'Redis', 'Cassandra', 'ClickHouse']
  }
};

export function initArchitectureSwitcher() {
  const tabButtons = document.querySelectorAll('.arch-tab-btn');
  const detailsEl = document.getElementById('arch-details');
  const diagramEl = document.getElementById('arch-diagram');

  if (!tabButtons.length || !detailsEl || !diagramEl) return;

  function renderArchitecture(key) {
    const data = ARCHITECTURE_DATA[key];
    if (!data) return;

    // Smooth fade effect
    detailsEl.style.opacity = '0';
    diagramEl.style.opacity = '0';

    setTimeout(() => {
      // Render details
      detailsEl.innerHTML = `
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        <ul class="arch-features">
          ${data.features.map(f => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
        <div class="card-tags" style="margin-top: 24px;">
          ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;

      // Render diagram
      diagramEl.innerHTML = data.diagram.map((node, index) => `
        <div class="diagram-node">
          <span style="color: #f5f5f7; font-weight: 500;">${node.name}</span>
          <span style="color: #2997ff; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">[${node.type}]</span>
        </div>
        ${index < data.diagram.length - 1 ? '<div class="diagram-arrow">↓ encrypted TLS tunnel ↓</div>' : ''}
      `).join('');

      detailsEl.style.transition = 'opacity 0.3s ease';
      diagramEl.style.transition = 'opacity 0.3s ease';
      detailsEl.style.opacity = '1';
      diagramEl.style.opacity = '1';
    }, 150);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const archKey = btn.getAttribute('data-arch');
      renderArchitecture(archKey);
    });
  });

  // Initial load
  renderArchitecture('microservices');
}
