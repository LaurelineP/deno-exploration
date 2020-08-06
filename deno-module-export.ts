/**
 * Exports are like usual exports
 */

export function denode( inputText:string ):string {
	return inputText.split('').sort().join('');
}