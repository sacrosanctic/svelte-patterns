---
title: Cloud Run
publish: false
tags:
---

https://determinate.systems/blog/nix-direnv/

```nix [flake.nix]
{
  description = "A development shell with Google Cloud SDK and components";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux"; # Or your system architecture
      pkgs = import nixpkgs { inherit system; };

      # Define the gcloud SDK with the components you need
      google-cloud-sdk-with-components = pkgs.google-cloud-sdk.withExtraComponents [
        pkgs.google-cloud-sdk.components.gke-gcloud-auth-plugin
        pkgs.google-cloud-sdk.components.kubectl
        # Add other components here, for example:
        # pkgs.google-cloud-sdk.components.cloud-build-local
        pkgs.google-cloud-sdk.components.gsutil
      ];

    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [
          google-cloud-sdk-with-components
          pkgs.nodejs_22
          pkgs.jq
        ];

        shellHook = ''
          echo "Google Cloud SDK and Node.js 22 environment is ready."
          echo "Included components: gcloud, gke-gcloud-auth-plugin, kubectl, gsutil"
        '';
      };
    };
}
```

```sh
nix develop
pnpm dlx sv create . --template minimal  --no-add-ons --types ts --no-install
pnpm dlx sv add sveltekit-adapter=adapter:node --no-install --no-git-check
gcloud init
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud projects add-iam-policy-binding [id] \
	--member=serviceAccount:[number]-compute@developer.gserviceaccount.com \
	--role=roles/run.builder
jq '.scripts.start="node build/index.js"' package.json > tmp.json && mv tmp.json package.json
echo -e ".*" >> .gcloudignore
gcloud run deploy helloworld \
	--source . \
	--region asia-east2 \
	--allow-unauthenticated \
	--quiet

# gcloud run services delete helloworld --region asia-east2
```

# reosurces

- https://docs.cloud.google.com/run/docs/quickstarts/frameworks/deploy-sveltekit-service
