const baseStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const baseTemplate = `<main class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to {{projectName}}</h1>
        <p class="text-gray-600 mb-8">Created on: {{creationDate}}</p>
        <p class="text-sm text-gray-500 mb-4">File: {{filePath}}</p>
        <button {{clickHandler}} class="text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            {{count}}
        </button>
    </div>
</main>`;

const reactTemplate = `<main className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to {{projectName}}</h1>
        <p className="text-gray-600 mb-8">Created on: {{creationDate}}</p>
        <p className="text-sm text-gray-500 mb-4">File: {{filePath}}</p>
        <button {{clickHandler}} className="text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            {{count}}
        </button>
    </div>
</main>`;

export const welcomePageContent = {
    angular: {
        html: baseTemplate,
        styles: baseStyles
    },
    astro: {
        html: baseTemplate,
        styles: baseStyles
    },
    react: {
        html: reactTemplate,
        styles: baseStyles
    },
    svelte: {
        html: baseTemplate,
        styles: baseStyles
    },
    vue: {
        html: baseTemplate,
        styles: baseStyles
    }
}; 