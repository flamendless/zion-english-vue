function close(e, toast) {
	toast.goAway(0);
}

function copy_email(toast) {
	toast.show("EMail Copied!", {
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
	toast.show("Skype ID Copied!", {
		iconPack: "fontawesome",
		icon: "font-awesome",
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
}
