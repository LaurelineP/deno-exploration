export function denode( inputText:string ):string {
	return inputText.split('').sort().join('');
}