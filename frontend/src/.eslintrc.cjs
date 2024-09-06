module.exports = {
    root: true, // Projenin root dosyasını belirler
    env: {
        browser: true, // Tarayıcı ortamı tanımlamaları
        es2021: true,  // ES2021 özelliklerini destekler
        node: true,    // Node.js ortamı tanımlamaları
    },
    parser: "vue-eslint-parser", // Vue dosyalarını parse etmek için
    parserOptions: {
        parser: "@typescript-eslint/parser", // TypeScript dosyalarını parse etmek için
        ecmaVersion: 2021, // ES2021 desteği
        sourceType: "module", // ES6 modüllerini kullanmak için
    },
    extends: [
        "eslint:recommended", // ESLint'in önerilen kuralları
        "plugin:vue/vue3-recommended", // Vue 3 için önerilen kurallar
        "plugin:@typescript-eslint/recommended", // TypeScript için önerilen kurallar
        "plugin:prettier/recommended", // Prettier entegrasyonu ve Prettier hatalarını eslint hatası olarak gösterme
    ],
    rules: {
        // Genel kurallar
        "no-unused-vars": "off", // Kullanılmayan değişkenler için hata verme
        "@typescript-eslint/no-unused-vars": ["error"], // TypeScript'te kullanılmayan değişkenleri kontrol et

        // Vue kuralları
        "vue/multi-word-component-names": "off", // Tek kelimelik bileşen isimlerine izin ver
        "vue/no-mutating-props": "error", // Prop'ları mutasyona uğratmaya karşı uyarı

        // Prettier ile ilgili kurallar
        "prettier/prettier": [
            "error",
            {
                singleQuote: true, // Tek tırnak kullan
                semi: true, // Her satırın sonunda noktalı virgül kullan
                printWidth: 80, // Maksimum satır genişliği
                trailingComma: "es5", // Son elemanda virgül kullanma
            },
        ],
    },
};
