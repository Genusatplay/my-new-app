# Тестовое задание #1

Первое разработанное веб приложение, до этого с веб не сталкивался.
На выполнение задания было отведено 4 недели(в основном вечером), из них 1 неделю выпавшую на праздники пролежал с температурой и практически не кодил, можно считать что на настройку окружения, ознакомление с стеком  и написание приложения ушло чуть больше 3 недель.

Задание:

> Создайте одностраничное веб приложение (SPA) по отображению таблицы сотрудников.
Колонки: name, email, birthday, salary.
Таблицу можно отсортировать по любой из колонок по убыванию и по возрастанию.
В таблице сотрудников показывается максимум 10 записей. Для отображения остальных
записей предусмотрен постраничный вывод и переключатель страниц: 1,2,3,4... и т.д.

> Выше таблицы сотрудников должна находится кнопка Add, вызывающая страницу добавления
нового сотрудника. После добавления вновь открывается таблица сотрудников.

>Каждую запись в таблице можно удалить или отредактировать (поля name, email, birthday,
salary), нажав на кнопку del или edit в соответствующей строке.
Редактирование записи происходит на отдельной странице. Это важное требование. Не в
строке таблицы, и не во всплывающем диалоге, а именно на отдельной странице со своим url
адресом.

>У каждого сотрудника должен быть свой уникальный идентификатор. URL страницы
редактирования сотрудника с id = 1 должен выглядеть так: /employee/1
URL страницы редактирования сотрудника с id = 1 должен выглядеть так: /employee/2
и т.д.

>Страница редактирования содержит кнопки Save и Cancel. Поле birthday при клике на нём
должно вызывать элемент datepicker для выбора даты.
Поля name, email, birthday, salary должны валидироваться. Все они обязательны для
заполнения. Поле birthday должно быть датой. Email - адресом эл. почты, salary -
положительным числом.

>Переключение страниц должно происходить без запроса на сервер. Но при этом каждая
страница должна иметь свой URL адрес.
При переключении страницы разрешается сделать один Ajax запрос на сервер для получения
данных, и на основе полученных данных, на клиенте, с помощью js должна генерироваться
новая html страница.

>Для доступа к приложению нужно использовать авторизацию.
Необходимо создать страницу логина для ввода пользователем логина и пароля. Логин: admin,
пароль: admin
Если пользователь не авторизован и пытается открыть любую другую страницу, вместо неё
пользователь должен перенаправляться на страницу логина.

>Приложение должно обрабатывать только авторизованные ajax запросы.
Тип авторизации для ajax запросов – JWT

>Формат даты при вводе и выводе должен соответствовать пользовательской локали, например
дату 4 ноября 2017 пользователи в US будут видеть как 11/4/17, а пользователи в UK как 4/11/17

>При выводе дат, дата должна преобразовываться в текущую таймзону (часовой пояс)
пользователя. Все даты в базе данных должны хранится в UTC.

### Технические требования:
* Все запросы на сервер должны получать данные в JSON формате и происходить через
ajax.
* Front-end должен работать на ReactJs (Back-end не работает с html)
* Back-end должен работать на ASP.NET Core
* База данных: MS SQL Express
* Для доступа к базе данных используйте EntityFramework
* Автоматизируйте сборку Front-end части приложения с помощью npm и webpack