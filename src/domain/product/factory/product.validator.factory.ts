import { ProductYupValidator } from "../../validator/product.yup.validator";
import { ValidatorInterface } from "../../validator/validator.interface";
import Product from "../entity/product";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product>{
        return new ProductYupValidator();
    }
}