
export default {
  header: {
    brand: 'Fontify'
  },
  app: {
    title: 'Генератор веб-шрифтов',
    subtitle: 'Создавайте CSS для веб-шрифтов из Google Fonts или загружайте TTF/OTF файлы'
  },
  languageSwitcher: {
    select: 'Выбрать язык',
    en: 'Английский',
    ru: 'Русский'
  },
  fontGenerator: {
    googleFontsTab: 'Google Fonts',
    uploadFontTab: 'Загрузить шрифт',
    googleFontsTitle: 'Создать из Google Fonts',
    googleFontsDescription: 'Введите URL Google Fonts для генерации CSS и кода подключения.',
    googleFontsPlaceholder: 'https://fonts.google.com/specimen/Roboto',
    googleFontsExample: 'Пример: https://fonts.google.com/specimen/Roboto или https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
    uploadFontTitle: 'Создать из файла шрифта',
    uploadFontDescription: 'Загрузите файл шрифта TTF или OTF для генерации CSS и кода подключения.',
    selectFileButton: 'Выберите файл TTF или OTF',
    processButton: 'Обработать',
    processingMessage: 'Обработка шрифта...',
    downloadArchive: 'Скачать пакет',
    noFontToDownload: 'Нет шрифта для скачивания',
    downloadSuccess: 'Пакет {{font}} успешно скачан',
    downloadError: 'Ошибка при скачивании пакета шрифта'
  },
  fontPreview: {
    heading: 'Предпросмотр',
    sample: 'Пример текста',
    paragraph: 'Съешь же ещё этих мягких французских булок, да выпей чаю. 0123456789',
    alphabet: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    customText: 'Свой текст:',
    customTextPlaceholder: 'Введите свой текст...',
    previewSizes: 'Размеры для предпросмотра'
  },
  codeOutput: {
    title: 'Код для подключения',
    css: 'CSS',
    html: 'HTML',
    copy: 'Копировать',
    copied: 'Скопировано!',
    cssPlaceholder: 'CSS-код будет сгенерирован здесь...',
    htmlPlaceholder: 'HTML-код будет сгенерирован здесь...',
    successMessage: '{{type}}-код скопирован в буфер обмена',
    errorMessage: 'Не удалось скопировать {{type}}-код'
  }
};
