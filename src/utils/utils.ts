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