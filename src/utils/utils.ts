export const getCardColor = (index: number) => {
    switch (index) {
      case 0:
        return "bg-list1";
        break;
      case 1:
        return "bg-list2";
        break;
      case 2:
        return "bg-list3";
        break;
      case 3:
        return "bg-list4";
        break;
      default:
        return "bg-list4";
    }
  };


  export const shuffle = (array: string[]): string[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };
  