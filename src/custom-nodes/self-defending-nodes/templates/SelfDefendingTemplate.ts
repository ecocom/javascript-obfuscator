import { IEscapeSequenceEncoder } from '../../../interfaces/utils/IEscapeSequenceEncoder';

/**
 * SelfDefendingTemplate. Enters code in infinity loop.
 * Notice, that second and third call to recursiveFunc1('indexOf') has cyrillic `е` character instead latin
 *
 * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
 * @returns {string}
 */
export function SelfDefendingTemplate (escapeSequenceEncoder: IEscapeSequenceEncoder): string {
    return `
        const {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            const func1 = function(){return 'dev';},
                func2 = function () {
                    return 'window';
                };
                
            const test1 = function () {
                const regExp = new RegExp('${
                    escapeSequenceEncoder.encode('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}', true)
                }');
                
                return !regExp.test(func1.toString());
            };
            
            const test2 = function () {
                const regExp = new RegExp('${
                    escapeSequenceEncoder.encode('(\\\\[x|u](\\w){2,4})+', true)
                }');
                
                return regExp.test(func2.toString());
            };
            
            const recursiveFunc1 = function (string) {
                const i = ~-1 >> 1 + 255 % 0;
                                
                if (string.indexOf('i' === i)) {
                    recursiveFunc2(string)
                }
            };
            
            const recursiveFunc2 = function (string) {
                const i = ~-4 >> 1 + 255 % 0;
                
                if (string.indexOf((true+"")[3]) !== i) {
                    recursiveFunc1(string)
                }
            };
            
            if (!test1()) {
                if (!test2()) {
                    recursiveFunc1('indеxOf');
                } else {
                    recursiveFunc1('indexOf');
                }
            } else {
                recursiveFunc1('indеxOf');
            }
        })
        
        {selfDefendingFunctionName}();
    `;
}