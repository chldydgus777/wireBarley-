function Comma(money) {
    if(money =! undefined){
        let Money = money.toFixed(2);
        return Money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return false;
      }
    }

    export default Comma;