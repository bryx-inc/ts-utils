import gulp from "gulp";
import { $ } from "zx";

gulp.task("clean:docs", () => $`find docs/* -not \\( -name 'index.html' -or -name 'tsutils_logo.png' -or -name '_footer.md' \\) -delete`);

gulp.task("build:docs", async () => {
    await $`npx typedoc \
                --name 'Docs' \
                --plugin typedoc-plugin-markdown \
                --plugin typedoc-plugin-merge-modules \
                --out typedoc-dist \
                --hideMembersSymbol \
                --hideBreadcrumbs \
                --hideInPageTOC \
                --excludeInternal \
                --mergeModulesMergeMode module-category \
                --entryPointStrategy resolve \
                --entryPoints src/index.ts`;

    await $`cp readme.md docs/`;

    await $`cat typedoc-dist/modules.md >> docs/README.md`;
    await $`cat typedoc-dist/classes/* >> docs/README.md`;

    await $`rm typedoc-dist/README.md`;
    await $`mv typedoc-dist/* docs/`;
});

gulp.task("deploy", async () => {
    await $`NPM_TOKEN=$(yarn config get _authToken) npm publish`;
    await $`git push origin $(git describe --tags)`;
    await $`git push origin main`;
});

gulp.task("build:lib", async () => {
    await $`rm -rf dist/`;
    await $`tsc`;
    await $`cp -R src/builtins dist/`
    await $`touch dist/builtins/object.js`;
});

gulp.task("check:lint", () => $`eslint .`);
gulp.task("check:formatting", () => $`prettier -c src/*`);

gulp.task("fix:formatting", () => $`prettier -w src/*`);

gulp.task("check:quality", gulp.parallel("check:lint", "check:formatting"));

gulp.task("clean:tags", async () => {
    await $`git tag -d $(git tag -l)`;
    await $`git fetch --tags`;
});

gulp.task("check:branch", async () => {
    const branch = (await $`git rev-parse --abbrev-ref HEAD`).toString().trim();
    if (branch != "main") throw "!! on branch " + branch + ", but must be on main to deploy";
});

gulp.task("predeploy", gulp.series(gulp.parallel("check:quality", "check:branch", "build:lib"), "clean:tags"));

gulp.task("version:patch", () => $`yarn version --patch`);
gulp.task("version:minor", () => $`yarn version --minor`);
gulp.task("version:major", () => $`yarn version --major`);

gulp.task("release:patch", gulp.series("predeploy", "version:patch", "deploy"));
gulp.task("release:minor", gulp.series("predeploy", "version:minor", "deploy"));
gulp.task("release:major", gulp.series("predeploy", "version:major", "deploy"));
