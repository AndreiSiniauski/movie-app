const cutText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    let cut = text.slice(0, maxLength);
    if (cut[cut.length - 1] !== ' ') {
      cut = cut.split(' ').reverse().slice(1).reverse().join(' ');
    }
    return `${cut} ...`;
  }
  return text;
};

export default cutText;
