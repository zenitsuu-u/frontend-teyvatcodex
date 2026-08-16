import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        globals: true,
        coverage: {
            provider: "v8",

            reporter: [
                "text",
                "html",
                "text-summary"
            ],

            reportsDirectory: "coverage",

            include: ["src/**/*.{ts,tsx}"],

            exclude: [
                "src/main.tsx",
                "src/App.tsx",
                "src/Authcontext.tsx",

                "src/pages/admin/**",
                "src/components/admin/**",

                "src/data/**",
                "src/services/**",

                "src/utils/materials.ts",
                "src/utils/materialTypes.ts",
                "src/utils/statLabels.ts",

                "src/pages/Login.tsx",
                "src/pages/Register.tsx",
                "src/pages/Account.tsx",

                "src/__tests__/**",
                "src/utils/**",
                "src/types.ts",
                "src/pages/CharacterDetails.tsx",
                "src/pages/WeaponDetails.tsx",
                "src/pages/PublicBuildList.tsx",
                "src/pages/BuildsDetails.tsx"
            ],
        },
    },
});

