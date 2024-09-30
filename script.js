// Добавляю "слушатель" события на кнопку с ID submitForm. Когда кнопка нажимается, вызывается функция, которая выполняет отправку данных.
document.getElementById('submitForm').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value; //Извлекается значение поля ввода с ID clientName. Это имя клиента, которое пользователь ввел в форму.
    const dealValue = document.getElementById('dealValue').value; //Извлекается значение поля ввода с ID dealValue. Это сумма сделки, введенная пользователем.
    const dealStatus = document.getElementById('dealStatus').value; // Извлекается значение поля ввода с ID dealStatus. Это статус сделки.

    const dealData = {
        title: clientName,
        value: dealValue,
        status: dealStatus
    };//Создается объект dealData, который содержит информацию о сделке. Ключи объекта (title, value, status) соответствуют данным, которые  отправляю в Pipedrive API.


    
    //Отправляю запрос на API Pipedrive для создания сделки. В URL запроса передается мой API токен (чтобы авторизоваться в системе).
    fetch('https://api.pipedrive.com/v1/deals?api_token=2865c8fd622798bae5647b4e9ef7f58484f78b32', {
        method: 'POST', //Указываю метод HTTP-запроса как POST, так как  отправляю новые данные (создаю новую сделку).
        headers: {
            'Content-Type': 'application/json',
        }, //Заголовки запроса. Указываю, что отправляю данные в формате JSON.
        body: JSON.stringify(dealData), // Тело запроса. передаю данные сделки в формате JSON, используя JSON.stringify(), чтобы преобразовать объект dealData в строку JSON.
    })
    .then(res => res.json()) //Когда сервер Pipedrive отвечает,  преобразую ответ в JSON с помощью res.json().
    .then(data => {
        console.log('Сделка успешно создана:', data);
    }) // В этом блоке обрабатывается успешный ответ от сервера. В консоль выводится сообщение о том, что сделка успешно создана, и сам ответ от Pipedrive.
    .catch(error => {
        console.error('Ошибка при создании сделки:', error); //Если произошла ошибка при запросе (например, неверный API токен или сервер недоступен), она будет поймана и выведена в консоль.
    });
});