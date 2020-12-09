import { required, confirmed, min, max, email, digits, length } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
	...required,
	message: "This field is required"
});

extend("email", {
	...email,
	message: "This field must be a valid email"
});

extend("confirmed", {
	...confirmed,
	message: "This field confirmation does not match"
});

extend("min", {
	...min,
	message: "Characters must be atleast minimum limit"
});

extend("max", {
	...max,
	message: "Character must not exceed max limit"
});

extend("digits", {
	...digits,
	message: "Must contain digits only"
});

extend("length", {
	...length,
	message: "This field must have atleast 1 selected"
});
