## V-0.5 TODO (alpha)
- -+поменять title
- +вопросик превращается в галочку после выбора 
- +странница где спрашивают имя юзера
- +выделить место в сторе для хранения имени
- +придумать систему хранения результатов теста (google firebase?)
- +создать поддомен для приложения
- +создать главный экран (стартСкрин)
- +вывести результаты тестов после прохождения
- +придумать экран для финального отображения результатов
- +заполнить вопросы
- +исправлять результаты после ввода в инпутРендже
- +починить ползунок в инпутРендже (после верстки для пк)
- +Перенести отправку результатов из RESULT PAGE в последний вопрос Slider
- +идеализм сменить на справедливость

## V-0.7 TODO (beta)
- +isResultSent - контроль отправки только одного результата
- +кнопка далее зеленеет после выбранного ответа
- +сортировать результаты по Убыванию ДО отправки
- +добавить поле `date` в документы FireBase?
- +получать результаты из FireBase отсортированные по дате добавления
- +сравнение результатов с другим человеком
- +градиенты без смазывания
- +/-страница AllResults
- +Изменить главную (убрать перенос, изменить описание, размеры шрифтов)
- +на экране ввода имени предлагаю все элементы поднять немного выше, и изменить плейсхолдер на "Ваше имя" A9A9A9, regular 17
- +сделать проверку на ссылку для сравнения от другого человека
- +текст на сером фоне лучше выровнять по левому краю
- +записывать в двухдневные куки результат прохождения
- +Добавить бургер-меню на странице результатов и на главной
- добавить кнопку “ПРОЙТИ ЗАНОВО” на странице результата после результата
- создать страницу контакты
- тестирование на iphone (скролл, позиционирование экранов) 
(после ввода имени экран должен открываться с прилипанием к верху, скрола быть не должно)
- версия для пк
- добавить Яндекс Метрику 

## V-0.8 TODO (demo, pre-release)
- создать новую коллекцию для хранения результатов
- сделать кружок размером с полосочку
- на хер вырезать стили antd
- добавить отдельные окна для сообщений об ошибках

## V-0.9 TODO (release)
- вырезать консоль логи и прочие НЕ production места 

## V-2.0 TODO
- добавить выводы после прохождения теста


# nano-react-app-template

The template project for [nano-react-app](https://github.com/adrianmcli/nano-react-app).

- `npm start` — This will spawn a development server with a default port of `1234`.
- `npm run build` — This will output a production build in the `dist` directory.

## Custom port

You can use the `-p` flag to specify a port for development. To do this, you can either run `npm start` with an additional flag:

```
npm start -- -p 3000
```

Or edit the `start` script directly:

```
parcel index.html -p 3000
```

## Adding styles

You can use CSS files with simple ES2015 `import` statements in your Javascript:

```js
import "./index.css";
```

## Babel transforms

The Babel preset [babel-preset-nano-react-app](https://github.com/adrianmcli/babel-preset-nano-react-app) and a small amount of configuration is used to support the same transforms that Create React App supports.

The Babel configuration lives inside `package.json` and will override an external `.babelrc` file, so if you want to use `.babelrc` remember to delete the `babel` property inside `package.json`.
