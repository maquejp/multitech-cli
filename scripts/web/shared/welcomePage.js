export const welcomePageContent = {
    html: `<div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to {{projectName}}</h1>
        <p class="text-gray-600 mb-8">Created on: {{creationDate}}</p>
        <div class="space-y-4">
            <p class="text-gray-700">
                Edit <code class="bg-gray-200 px-2 py-1 rounded">{{filePath}}</code> and save to test HMR
            </p>
            <div class="flex justify-center gap-4">
                <button
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    {{clickHandler}}
                >
                    Count is {{count}}
                </button>
            </div>
        </div>
    </div>
</div>`,
    styles: `@tailwind base;
@tailwind components;
@tailwind utilities;`
}; 