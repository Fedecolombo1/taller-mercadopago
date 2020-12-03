function primo(num){
    for(var i = 2; i <= num; i++){
        if (num == 1 || num == 2){
            return "es primo"
        } else {
            if(num % i == 0 && i != num){
                return "No es primo"
            } else {
                return "Es primo"
            }
        }
    }
}