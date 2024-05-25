//  const apiKey = '93b4225a76a1815627f2e9aa'; /latest/USD
//    const apiUrl = `https://v6.exchangerate-api.com/v6/93b422a76a1815627f2e9aa/latest/USDapp_id=${apiKey}`;

document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '93b4225a76a1815627f2e9aa'; // Reemplaza con tu clave de API de ExchangeRate-API
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultText = document.getElementById('resultText');

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API:', data);
            const currencies = Object.keys(data.conversion_rates);
            populateCurrencySelects(currencies);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al obtener las tasas de cambio.');
        });

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || fromCurrency === '' || toCurrency === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const convertUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;
        console.log('URL de conversión:', convertUrl);

        fetch(convertUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al realizar la conversión');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resultado de la conversión:', data);
                const convertedAmount = data.conversion_result.toFixed(2);
                resultText.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

                // Mostrar el modal con el resultado
                const modal = document.getElementById('myModal');
                const modalResultText = document.getElementById('modalResultText');
                modalResultText.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                modalResultText.classList.add('result-text'); // Añadir clase para resaltar el resultado
                modal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error al realizar la conversión:', error);
                alert('Hubo un error al realizar la conversión.');
            });
    });

    function populateCurrencySelects(currencies) {
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.text = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.text = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    }

    // Cerrar el modal al hacer clic en el botón de cerrar
    const modalCloseBtn = document.querySelector('.close');
    modalCloseBtn.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });
});