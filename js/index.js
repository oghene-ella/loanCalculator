/// listen for submit
document.getElementById('ella').style.display = 'block';
document.getElementById('loan-form').addEventListener('submit',function(e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    document.getElementById('ella').style.display = 'none';
    document.getElementById('ella1').style.display = 'block';

   setTimeout(calculateResults, 2000)
    e.preventDefault();
});
function calculateResults(){
    //ui variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')


    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayment = parseFloat(years.value) * 12;

    //monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = ( principal*x*calculatedInterest ) / (x-1)

     if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2)
        
        //show loader
        document.getElementById('results').style.display = 'block';
   

        //hide loader
        document.getElementById('loading').style.display = 'none';
        document.getElementById('ella1').style.display = 'block';
    }else{
         showError('Please check your numbers🙄')
     }


     setTimeout(clearInput, 4000)
     setTimeout(clearResult, 4000)

}

//show error message
function showError(error){
    //show loader
    document.getElementById('results').style.display = 'none';

    //hide loader
    document.getElementById('loading').style.display = 'none';
    document.getElementById('ella').style.display = 'block';

    const errorDiv = document.createElement('div');

    // get error message
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // add class 
    errorDiv.className = 'alert alert-danger'

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading)

    // clear error after 3 seconds 
    setTimeout(clearError, 3000)
}

// clear error
function clearError(){
    document.querySelector('.alert').remove()
}
function clearResult(){
    document.querySelector('#results').remove()
    document.getElementById('ella').style.display = 'block';
}
function clearInput(){
    amount.value = ''
    interest.value = ''
     years.value = ''
}