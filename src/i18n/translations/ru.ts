/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import type { Messages } from "./en";

const ru: Messages = {
  "seo.title": "Fontify — бесплатный генератор веб-шрифтов: Google Fonts, TTF, OTF, WOFF",
  "seo.description": "Бесплатный генератор веб-шрифтов: CSS, HTML и Tailwind-код для Google Fonts и ваших файлов TTF, OTF, WOFF и WOFF2. Живой предпросмотр, выбор начертаний, скачивание ZIP. Работает в браузере.",
  "header.brand": "Fontify",
  "header.github": "Исходный код на GitHub",
  "app.title": "Генератор веб-шрифтов",
  "app.subtitle": "Создавайте CSS, HTML и Tailwind-код для веб-шрифтов из Google Fonts или собственных файлов.",
  "app.privacy": "Всё работает в браузере — загруженные файлы не покидают ваше устройство.",
  "languageSwitcher.select": "Выбрать язык",
  "language.en": "English",
  "language.ru": "Русский",
  "theme.toggle": "Сменить тему",
  "theme.light": "Светлая",
  "theme.dark": "Тёмная",
  "theme.system": "Системная",

  "fontGenerator.googleFontsTab": "Google Fonts",
  "fontGenerator.uploadFontTab": "Загрузить шрифт",
  "fontGenerator.googleFontsTitle": "Создать из Google Fonts",
  "fontGenerator.googleFontsDescription": "Вставьте ссылку Google Fonts или просто введите название шрифта, чтобы получить CSS и код подключения.",
  "fontGenerator.googleFontsLabel": "Ссылка Google Fonts или название шрифта",
  "fontGenerator.googleFontsPlaceholder": "https://fonts.google.com/specimen/Roboto",
  "fontGenerator.googleFontsExample": "Пример: Roboto, https://fonts.google.com/specimen/Roboto или ссылка fonts.googleapis.com/css2",
  "fontGenerator.popular": "Популярные:",
  "fontGenerator.uploadFontTitle": "Создать из файла шрифта",
  "fontGenerator.uploadFontDescription": "Загрузите файл TTF, OTF, WOFF или WOFF2 (до 10 МБ), чтобы получить код @font-face.",
  "fontGenerator.selectFileButton": "Выберите файл шрифта",
  "fontGenerator.dropHint": "или перетащите его сюда",
  "fontGenerator.dropActive": "Отпустите файл здесь",
  "fontGenerator.processButton": "Создать",
  "fontGenerator.processingMessage": "Обработка шрифта…",
  "fontGenerator.downloadArchive": "Скачать пакет",
  "fontGenerator.noFontToDownload": "Нет шрифта для скачивания",
  "fontGenerator.downloadSuccess": "Пакет {{font}} скачан",
  "fontGenerator.downloadError": "Не удалось создать пакет шрифта",
  "fontGenerator.enterUrl": "Введите ссылку Google Fonts или название шрифта",
  "fontGenerator.invalidUrl": "Неверная ссылка Google Fonts или название шрифта. Проверьте и попробуйте снова.",
  "fontGenerator.processSuccess": "Шрифт «{{font}}» готов",
  "fontGenerator.processError": "Не удалось обработать шрифт. Попробуйте ещё раз.",
  "fontGenerator.sourceGoogle": "Google Fonts",
  "fontGenerator.sourceFile": "Загруженный файл",

  "upload.errorExtension": "Загрузите файл TTF, OTF, WOFF или WOFF2",
  "upload.errorSize": "Файл пустой или больше 10 МБ",
  "upload.errorSignature": "Файл не похож на корректный шрифт",
  "upload.errorRead": "Не удалось прочитать файл",

  "weights.title": "Начертания",
  "weights.italic": "Добавить курсив",
  "weights.hint": "Выберите нужные начертания. Не все семейства содержат каждое начертание и курсив.",
  "weights.loadError": "Google Fonts не смог загрузить этот набор. Выберите меньше начертаний или отключите курсив.",

  "preview.heading": "Предпросмотр",
  "preview.unavailable": "Предпросмотр недоступен",
  "preview.loading": "Загрузка шрифта…",
  "preview.sampleText": "Съешь же ещё этих мягких французских булок",
  "preview.sampleParagraph": "Съешь же ещё этих мягких французских булок, да выпей чаю. 0123456789",
  "preview.text": "Текст для предпросмотра",
  "preview.size": "Размер",
  "preview.variants": "Начертания",
  "preview.paragraph": "Параграф",
  "preview.characters": "Символы",
  "preview.regular": "Обычный",
  "preview.italic": "Курсив",

  "codeOutput.title": "Код",
  "codeOutput.css": "CSS",
  "codeOutput.html": "HTML",
  "codeOutput.tailwind": "Tailwind",
  "codeOutput.copy": "Копировать",
  "codeOutput.copied": "Скопировано",
  "codeOutput.successMessage": "{{type}}-код скопирован в буфер обмена",
  "codeOutput.errorMessage": "Не удалось скопировать {{type}}-код",

  "footer.copyright": "© {{years}}",
  "footer.rights": "Открытый код на GitHub",

  "notFound.title": "Страница не найдена",
  "notFound.description": "Такой страницы не существует или она была перемещена.",
  "notFound.back": "Вернуться в Fontify",
};

export default ru;
