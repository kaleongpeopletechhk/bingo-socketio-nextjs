export function randomNumbers(): number[] {
    let numbers: number[] = [];

    while (numbers.length < 25) {
      const randomNumber = Math.floor(Math.random() * 99) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers
}

export const sorting = (numbers: number[]) => {
  return [...numbers].sort((a, b) => a - b);
}

export const checkBoard = (numbers: number[], cartela: number[],pattern: string) => {
  

  
  if(pattern == "Row"){
    for (let row = 0; row < 5; row++) {
      let match: boolean = true;
      for (let index = 0; index < 5; index++) {
        
        const position: number = row*5 + index;

        
        
        if(cartela.includes(numbers[position]) == false){
          
          
          match = false;
          break;
        }
          
        
        
        
      }
      
      if(match){
        return true;
      }
      
    }
  }
  
  if(pattern == "Column"){
    for (let row = 0; row < 5; row++) {
      let match: boolean = true;
      for (let index = 0; index < 5; index++) {
        
        const position: number = index*5 + row;

        if(cartela.includes(numbers[position]) == false){
          match = false;
          break;
        }
          
        
        
        
      }
  
      if(match){
        return true;
      }
  
      
      
    }
  }
  

  if(pattern == "Diagonal"){
    
      
      console.log(cartela.includes(numbers[0]));
      console.log(cartela.includes(numbers[6]));
      console.log(cartela.includes(numbers[12]));
      console.log(cartela.includes(numbers[18]));
      console.log(cartela.includes(numbers[24]));
    if(cartela.includes(numbers[0]) == true && cartela.includes(numbers[6]) == true && cartela.includes(numbers[12]) == true && cartela.includes(numbers[18]) == true && cartela.includes(numbers[24]) == true){
      
      console.log("Diagonal Wins");
      
      
      return true;
    }

    if(cartela.includes(numbers[4]) == true && cartela.includes(numbers[8]) == true && cartela.includes(numbers[12]) == true && cartela.includes(numbers[16]) == true && cartela.includes(numbers[20]) == true){
      return true;
    }
  }

  return false;

}