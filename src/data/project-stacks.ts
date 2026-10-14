export interface StackTechnology { name: string; role: string; source?: string }
export interface StackLayer { label: string; source: string; items: StackTechnology[] }

// Audited against public repository manifests, templates, imports, and deployment files.
// Includes direct dependencies and used platform/integration tooling, not transitive packages.
export const projectStacks: Record<string, StackLayer[]> = {
  "transitradar": [
    {
      "label": "Browser",
      "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/web/city.html",
      "items": [
        {
          "name": "JavaScript",
          "role": "Native ES modules; no frontend framework."
        },
        {
          "name": "HTML",
          "role": "Landing page, city views, and station/route controls."
        },
        {
          "name": "CSS",
          "role": "Responsive layouts and map chrome."
        },
        {
          "name": "Leaflet",
          "role": "Map rendering, tile layers, markers, and route geometry."
        },
        {
          "name": "Geist Mono",
          "role": "Self-hosted landing-page font in web/styles/fonts.css.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/web/styles/fonts.css"
        }
      ]
    },
    {
      "label": "Services",
      "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/services/gvh-api/package.json",
      "items": [
        {
          "name": "Node.js",
          "role": "City-specific HTTP API services; Node 22 or newer."
        },
        {
          "name": "fast-xml-parser",
          "role": "Parses TRIAS XML responses in the GVH service."
        },
        {
          "name": "vbb-rest",
          "role": "Berlin transport backend, deployed as a separate container.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/docker-compose.yaml"
        },
        {
          "name": "Redis",
          "role": "Cache service for the vbb-rest container.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/docker-compose.yaml"
        },
        {
          "name": "JSON / XML",
          "role": "Transport response formats normalized at the API boundary."
        }
      ]
    },
    {
      "label": "Networks",
      "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/web/js/config.js",
      "items": [
        {
          "name": "VBB",
          "role": "Berlin network configuration and transport data."
        },
        {
          "name": "HVV / Geofox",
          "role": "Hamburg service adapter."
        },
        {
          "name": "RMV",
          "role": "Frankfurt transport API service."
        },
        {
          "name": "GVH / TRIAS",
          "role": "Hannover XML-based transit integration."
        },
        {
          "name": "CARTO / OSM",
          "role": "CARTO dark tiles with OpenStreetMap map data.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/web/js/map/map.js"
        }
      ]
    },
    {
      "label": "Deploy / test",
      "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/Dockerfile",
      "items": [
        {
          "name": "Docker",
          "role": "Multi-stage build and isolated API containers."
        },
        {
          "name": "Docker Compose",
          "role": "Service orchestration for vbb-rest and Redis.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/docker-compose.yaml"
        },
        {
          "name": "NGINX",
          "role": "Static web serving from the runtime image."
        },
        {
          "name": "Alpine Linux",
          "role": "Node and NGINX container base images."
        },
        {
          "name": "node:test",
          "role": "Native Node test runner for web and service tests.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/web/package.json"
        },
        {
          "name": "Umami",
          "role": "Optional analytics deployment in deploy/umami-compose.yaml.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/deploy/umami-compose.yaml"
        },
        {
          "name": "PostgreSQL",
          "role": "Database for the separate Umami analytics deployment.",
          "source": "https://github.com/FlorianHoelzel/transitradar/blob/main/deploy/umami-compose.yaml"
        }
      ]
    }
  ],
  "MONOLITH-public": [
    {
      "label": "Runtime",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/app.py",
      "items": [
        {
          "name": "Python",
          "role": "Application runtime; README requires Python 3.13+."
        },
        {
          "name": "SQLite",
          "role": "Local application persistence through sqlite3."
        },
        {
          "name": "Jinja templates",
          "role": "Flask-rendered dashboard and design-lab templates."
        },
        {
          "name": "JavaScript",
          "role": "Dashboard interactions and service worker."
        },
        {
          "name": "HTML / CSS",
          "role": "Server-rendered interface and responsive styling."
        }
      ]
    },
    {
      "label": "Python deps",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/requirements.txt",
      "items": [
        {
          "name": "aiowebostv",
          "role": "Async LG webOS television integration."
        },
        {
          "name": "aiohttp",
          "role": "Async HTTP client for network integrations."
        },
        {
          "name": "caldav",
          "role": "CalDAV calendar integration."
        },
        {
          "name": "Flask",
          "role": "HTTP routes and server-rendered dashboard."
        },
        {
          "name": "fritzconnection",
          "role": "FRITZ!Box connectivity and network integration."
        },
        {
          "name": "HAP-python",
          "role": "HomeKit accessory protocol bridge."
        },
        {
          "name": "python-dotenv",
          "role": "Loads private environment configuration."
        },
        {
          "name": "requests",
          "role": "Synchronous HTTP client for API integrations."
        },
        {
          "name": "python-picnic-api2",
          "role": "Picnic grocery service client."
        },
        {
          "name": "pyatv",
          "role": "Apple TV and HomePod discovery/playback integration."
        },
        {
          "name": "pywebpush",
          "role": "Web Push delivery to subscribed browsers."
        },
        {
          "name": "waitress",
          "role": "Production WSGI server."
        }
      ]
    },
    {
      "label": "Browser",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/templates/dashboard.html",
      "items": [
        {
          "name": "Chart.js",
          "role": "Dashboard chart library loaded by the template.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/templates/dashboard.html"
        },
        {
          "name": "Tabler Icons",
          "role": "Icon webfont loaded from jsDelivr.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/templates/dashboard.html"
        },
        {
          "name": "Manrope",
          "role": "Self-hosted variable font.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/templates/dashboard.html"
        },
        {
          "name": "Service Worker",
          "role": "PWA asset/offline behavior in static/service-worker.js.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/static/service-worker.js"
        },
        {
          "name": "Web Push",
          "role": "Browser subscription and notification delivery.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/push_notifications.py"
        },
        {
          "name": "WebGL",
          "role": "Dependency-free shader rendering in the design lab.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/static/design-lab.js"
        }
      ]
    },
    {
      "label": "Integrations",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/weather.py",
      "items": [
        {
          "name": "HomeKit",
          "role": "Separate accessory bridge service.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/homekit_bridge.py"
        },
        {
          "name": "Open-Meteo",
          "role": "Forecast and place-search APIs."
        },
        {
          "name": "Nominatim / OSM",
          "role": "Postal geocoding and map attribution."
        },
        {
          "name": "WeWash",
          "role": "Laundry state API in monolith/wewash.py.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/wewash.py"
        },
        {
          "name": "Hugging Face Datasets",
          "role": "Recipe dataset rows in monolith/recipe_api.py.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/recipe_api.py"
        },
        {
          "name": "Matterbridge",
          "role": "Integration module in monolith/matterbridge.py.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/matterbridge.py"
        },
        {
          "name": "Windows PC agent",
          "role": "Separate status agent and deployment scripts.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/deploy/windows-pc-agent/README.md"
        }
      ]
    },
    {
      "label": "Desktop",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/desktop/package.json",
      "items": [
        {
          "name": "Electron",
          "role": "Optional desktop wrapper for the dashboard."
        },
        {
          "name": "electron-builder",
          "role": "Windows desktop packaging."
        },
        {
          "name": "NSIS",
          "role": "Installer target configured by electron-builder."
        }
      ]
    },
    {
      "label": "Deploy / test",
      "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/deploy/install-pi.sh",
      "items": [
        {
          "name": "Raspberry Pi / Linux",
          "role": "Target runtime for the local household services."
        },
        {
          "name": "systemd",
          "role": "Dashboard, HomeKit, and HTTP service units."
        },
        {
          "name": "Caddy",
          "role": "Local HTTPS proxy configuration.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/deploy/Caddyfile"
        },
        {
          "name": "FFmpeg",
          "role": "Installed by the Pi deployment script for media processing."
        },
        {
          "name": "Bash / PowerShell",
          "role": "Installation, updates, and remote deployment scripts.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/deploy/deploy-to-pi.ps1"
        },
        {
          "name": "venv / pip",
          "role": "Isolated Python dependency installation."
        },
        {
          "name": "unittest",
          "role": "Python regression test runner.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/README.md"
        },
        {
          "name": "node:test",
          "role": "Native Node tests for Web Push behavior.",
          "source": "https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/README.md"
        }
      ]
    }
  ],
  "yoshi-leaderboards": [
    {
      "label": "Browser",
      "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/public/index.html",
      "items": [
        {
          "name": "JavaScript",
          "role": "Native browser scripts split into domain, store, and UI modules."
        },
        {
          "name": "HTML",
          "role": "Static document shell and accessible controls."
        },
        {
          "name": "CSS",
          "role": "Responsive styles and system-aware themes."
        },
        {
          "name": "SVG",
          "role": "Decorative landscape and browser-rendered charts."
        },
        {
          "name": "localStorage",
          "role": "Browser-local demo submissions and preferences.",
          "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/public/assets/js/data/store.js"
        },
        {
          "name": "Web Workers",
          "role": "Recommendation computation in domain/recommendations-worker.js.",
          "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/public/assets/js/domain/recommendations-worker.js"
        },
        {
          "name": "Hash routing",
          "role": "Direct board links and browser navigation state."
        }
      ]
    },
    {
      "label": "Data",
      "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/README.md",
      "items": [
        {
          "name": "JSON",
          "role": "Static run fixtures and imported snapshots."
        },
        {
          "name": "CSV",
          "role": "Run import source and export format."
        },
        {
          "name": "speedrun.com API",
          "role": "Import-time metadata and category resolution; no runtime API dependency."
        }
      ]
    },
    {
      "label": "Build / deploy",
      "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/package.json",
      "items": [
        {
          "name": "Node.js",
          "role": "Dependency-free build, validation, import, and preview scripts."
        },
        {
          "name": "node:test",
          "role": "Built-in test runner."
        },
        {
          "name": "GitHub Actions",
          "role": "Check, test, build, and publish workflow.",
          "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/.github/workflows/pages.yml"
        },
        {
          "name": "GitHub Pages",
          "role": "Static production hosting.",
          "source": "https://github.com/FlorianHoelzel/yoshi-leaderboards/blob/main/README.md"
        }
      ]
    }
  ],
  "sumof.best": [
    {
      "label": "App",
      "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/package.json",
      "items": [
        {
          "name": "TypeScript",
          "role": "Typed archive models, routes, and Worker code."
        },
        {
          "name": "JavaScript",
          "role": "Native browser scripts in the Twitch extension."
        },
        {
          "name": "HTML / CSS",
          "role": "Archive layout, responsive styles, and extension documents."
        },
        {
          "name": "Node.js",
          "role": "Node 22.13+ per package engines."
        },
        {
          "name": "@fontsource-variable/manrope",
          "role": "Bundled variable Manrope font."
        },
        {
          "name": "next",
          "role": "Next-compatible routing/component APIs used with Vinext."
        },
        {
          "name": "react",
          "role": "React component runtime."
        },
        {
          "name": "react-dom",
          "role": "React DOM rendering."
        }
      ]
    },
    {
      "label": "Build",
      "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/package.json",
      "items": [
        {
          "name": "@cloudflare/vite-plugin",
          "role": "Cloudflare Worker integration in Vite."
        },
        {
          "name": "@tailwindcss/postcss",
          "role": "Tailwind PostCSS integration."
        },
        {
          "name": "@vitejs/plugin-basic-ssl",
          "role": "Local HTTPS for Twitch extension development."
        },
        {
          "name": "@vitejs/plugin-react",
          "role": "React integration for the Vite toolchain."
        },
        {
          "name": "@vitejs/plugin-rsc",
          "role": "React Server Components integration."
        },
        {
          "name": "eslint",
          "role": "Source linting."
        },
        {
          "name": "eslint-config-next",
          "role": "Next-oriented ESLint rules."
        },
        {
          "name": "fflate",
          "role": "Compression/ZIP tooling for extension packaging."
        },
        {
          "name": "react-server-dom-webpack",
          "role": "React Server Components transport implementation."
        },
        {
          "name": "tailwindcss",
          "role": "CSS tooling declared in the development manifest."
        },
        {
          "name": "typescript",
          "role": "Type checking and typed application source."
        },
        {
          "name": "vinext",
          "role": "Vite-based Next-compatible application runtime/build."
        },
        {
          "name": "vite",
          "role": "Application and Twitch extension build tooling."
        },
        {
          "name": "wrangler",
          "role": "Cloudflare Worker tooling."
        }
      ]
    },
    {
      "label": "Types / test",
      "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/package.json",
      "items": [
        {
          "name": "@types/node",
          "role": "Node.js type definitions."
        },
        {
          "name": "@types/react",
          "role": "React type definitions."
        },
        {
          "name": "@types/react-dom",
          "role": "React DOM type definitions."
        },
        {
          "name": "node:test",
          "role": "Rendered-HTML tests run against the production build."
        }
      ]
    },
    {
      "label": "Integrations",
      "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/twitch-extension/panel.html",
      "items": [
        {
          "name": "speedrun.com API",
          "role": "Public profile, run, game, and leaderboard metadata.",
          "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/app/speedrun-archive.ts"
        },
        {
          "name": "Twitch Extension Helper",
          "role": "Twitch-hosted extension integration script."
        },
        {
          "name": "YouTube / Twitch",
          "role": "Run video embeds where supported.",
          "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/README.md"
        }
      ]
    },
    {
      "label": "Deploy",
      "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/vite.config.ts",
      "items": [
        {
          "name": "Cloudflare Workers",
          "role": "Worker runtime via the Cloudflare Vite plugin."
        },
        {
          "name": "D1",
          "role": "Optional database binding enabled by hosting configuration."
        },
        {
          "name": "R2",
          "role": "Optional object storage binding enabled by hosting configuration."
        },
        {
          "name": "Sites build plugin",
          "role": "Local build/sites-vite-plugin integration.",
          "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/vite.config.ts"
        },
        {
          "name": "Docker",
          "role": "Alternative multi-stage Node application image.",
          "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/Dockerfile"
        },
        {
          "name": "Alpine Linux",
          "role": "Container base in Dockerfile.",
          "source": "https://github.com/FlorianHoelzel/sumof.best/blob/main/Dockerfile"
        }
      ]
    }
  ],
  "lg-thinq-homekit": [
    {
      "label": "Runtime",
      "source": "https://github.com/FlorianHoelzel/lg-thinq-homekit/blob/main/requirements.txt",
      "items": [
        {
          "name": "Python",
          "role": "Async appliance bridge runtime."
        },
        {
          "name": "aiohttp",
          "role": "Async HTTP dependency pinned in requirements.txt."
        },
        {
          "name": "thinqconnect",
          "role": "LG ThinQ Connect client."
        },
        {
          "name": "HAP-python",
          "role": "HomeKit accessory protocol server."
        }
      ]
    },
    {
      "label": "Integration",
      "source": "https://github.com/FlorianHoelzel/lg-thinq-homekit/blob/main/README.md",
      "items": [
        {
          "name": "LG ThinQ",
          "role": "Washer state and remaining-time integration.",
          "source": "https://github.com/FlorianHoelzel/lg-thinq-homekit/blob/main/lg.py"
        },
        {
          "name": "HomeKit",
          "role": "Apple Home accessory exposure.",
          "source": "https://github.com/FlorianHoelzel/lg-thinq-homekit/blob/main/lg.py"
        },
        {
          "name": "JSON",
          "role": "External bridge configuration.",
          "source": "https://github.com/FlorianHoelzel/lg-thinq-homekit/blob/main/config.py"
        }
      ]
    }
  ],
  "windows-pc-homekit": [
    {
      "label": "Runtime",
      "source": "https://github.com/FlorianHoelzel/windows-pc-homekit/blob/main/pc_homekit.py",
      "items": [
        {
          "name": "Python",
          "role": "HomeKit bridge and Windows status/control agent."
        },
        {
          "name": "HAP-python",
          "role": "HomeKit accessory server; sole requirements.txt dependency.",
          "source": "https://github.com/FlorianHoelzel/windows-pc-homekit/blob/main/requirements.txt"
        },
        {
          "name": "HTTP",
          "role": "Bridge-to-agent requests through Python urllib."
        },
        {
          "name": "UDP / Wake-on-LAN",
          "role": "Magic-packet power-on path through sockets."
        }
      ]
    },
    {
      "label": "Integration",
      "source": "https://github.com/FlorianHoelzel/windows-pc-homekit/blob/main/README.md",
      "items": [
        {
          "name": "Windows",
          "role": "Target OS for the PC agent."
        },
        {
          "name": "HomeKit",
          "role": "PC exposure in Apple Home."
        },
        {
          "name": "JSON",
          "role": "Bridge and agent configuration files."
        }
      ]
    }
  ],
  "philips-homekit": [
    {
      "label": "Runtime",
      "source": "https://github.com/FlorianHoelzel/philips-homekit/blob/main/requirements.txt",
      "items": [
        {
          "name": "Python / asyncio",
          "role": "Async air purifier polling and control."
        },
        {
          "name": "aioairctrl",
          "role": "Philips air purifier client."
        },
        {
          "name": "HAP-python",
          "role": "HomeKit accessory protocol server."
        }
      ]
    },
    {
      "label": "Integration",
      "source": "https://github.com/FlorianHoelzel/philips-homekit/blob/main/philips_homekit.py",
      "items": [
        {
          "name": "CoAP",
          "role": "Device communication through aioairctrl.CoAPClient."
        },
        {
          "name": "HomeKit",
          "role": "Native air purifier accessory exposure.",
          "source": "https://github.com/FlorianHoelzel/philips-homekit/blob/main/philips_homekit.py"
        },
        {
          "name": "RotatingFileHandler",
          "role": "Python standard-library rotating logs."
        }
      ]
    }
  ],
  "robovac-g30": [
    {
      "label": "Runtime",
      "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/src/local_client.py",
      "items": [
        {
          "name": "Python",
          "role": "Device client and standard-library HTTP API."
        },
        {
          "name": "requests",
          "role": "Imported by cloud/setup clients; omitted from the empty requirements.txt.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/src/tuya_client.py"
        },
        {
          "name": "cryptography",
          "role": "AES cipher/padding imports in the local and Tuya clients; absent from requirements.txt."
        },
        {
          "name": "HTTP / JSON",
          "role": "Local control API on 127.0.0.1:8765.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/src/api.py"
        }
      ]
    },
    {
      "label": "Bridge",
      "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/matterbridge/package.json",
      "items": [
        {
          "name": "TypeScript",
          "role": "Matterbridge plugin source and compiler dependency."
        },
        {
          "name": "Node.js",
          "role": "Matterbridge host runtime.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/README.md"
        },
        {
          "name": "Matterbridge",
          "role": "Plugin host exposing the robotic vacuum device.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/matterbridge/src/module.ts"
        },
        {
          "name": "Matter",
          "role": "Native robotic vacuum accessory protocol.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/matterbridge/src/module.ts"
        },
        {
          "name": "Tuya 3.3",
          "role": "Direct LAN device protocol used for normal operation.",
          "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/src/local_client.py"
        },
        {
          "name": "Apple Home",
          "role": "Matter controller and pairing target."
        }
      ]
    },
    {
      "label": "Deploy",
      "source": "https://github.com/FlorianHoelzel/robovac-g30/blob/main/README.md",
      "items": [
        {
          "name": "Raspberry Pi / Linux",
          "role": "Documented local deployment target."
        },
        {
          "name": "systemd",
          "role": "Documented automatic-startup compatibility."
        },
        {
          "name": "Eufy / Tuya APIs",
          "role": "Setup/cloud clients for device discovery and local credentials."
        }
      ]
    }
  ]
};
