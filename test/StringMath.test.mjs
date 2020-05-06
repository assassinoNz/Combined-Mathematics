import "mocha";
import * as assert from "assert";

import {StringMath} from "../src/StringMath.mjs";

describe('StringMath', () => {
    describe('#addUnsignedInt()', () => {
        it('should return the correct answer if both values are integers', () => {
            assert.equal(StringMath.addUnsignedInt("10", "11"), "21");
        });
    });
});