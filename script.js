document.getElementById('submitForm').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value; 
    const dealValue = document.getElementById('dealValue').value;
    const dealStatus = document.getElementById('dealStatus').value;

  // Проверка обязательных полей
  if (!clientName || !dealValue || !dealStatus ) {
    alert('Все поля формы должны быть заполнены!');
    return;
}  

    const dealData = {
        title: clientName,
        value: dealValue,
        status: dealStatus,
    };
  // API-запрос 
  fetch('https://api.pipedrive.com/v1/deals?api_token=4cd7e1e9b1e1390a8dc19708132ea2ea9df0009d',  {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dealData), 
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Сделка успешно создана!');
            console.log('Сделка успешно создана:', data);
        } else {
            alert(`Ошибка: ${data.error || 'Не удалось создать сделку'}`);
            console.error('Ошибка при создании сделки:', data);
        }
    })
    .catch(error => {
        alert('Произошла ошибка при отправке данных на сервер.');
        console.error('Ошибка при создании сделки:', error);
    });
    
});