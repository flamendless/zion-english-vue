function close(e, toast) {
	toast.goAway(0);
}

function copy_email(toast) {
	toast.show("E-Mail copied to clipboard!", {
		iconPack: "material",
		icon: "email",
		position: "top-right",
		duration: "3000",
		keepOnHover: true,
		closeOnSwipe: true,
		action: {
			text: "x",
			onClick: close,
		}
	});
}

function copy_skype(toast) {
	toast.show("Skype ID copied to clipboard!", {
		// iconPack: "custom-class",
		iconPack: "material",
		icon: "content_copy",
		position: "top-right",
		duration: "3000",
		keepOnHover: true,
		closeOnSwipe: true,
		action: {
			text: "x",
			onClick: close,
		}
	});
}

function copy_number(toast) {
	toast.show("Phone Number copied to clipboard!", {
		// iconPack: "custom-class",
		iconPack: "material",
		icon: "content_copy",
		position: "top-right",
		duration: "3000",
		keepOnHover: true,
		closeOnSwipe: true,
		action: {
			text: "x",
			onClick: close,
		}
	});
}

export default {
	copy_email,
	copy_skype,
	copy_number,
}
