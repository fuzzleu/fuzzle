import style from "styles/dropdown.module.scss"

const ImageDropdown = ({ setDropdowns, setModals }) => {
	const closeDropdown = () =>
		setDropdowns((prev) => {
			return {
				...prev,
				image: false,
			}
		})

	return (
		<div
			className={style.dropdown}
			name='image'
			onMouseLeave={closeDropdown}
		>
			<button
				className={style.dropdownBtn}
				onClick={() =>
					setModals((prev) => {
						return {
							...prev,
							canvasSize: !prev.canvasSize,
						}
					})
				}
			>
				Canvas Size...
			</button>
			<button className={style.dropdownBtn}>Brightness</button>
			<button className={style.dropdownBtn}>Contrast</button>
			<button className={style.dropdownBtn}>Saturation</button>
			<button className={style.dropdownBtn}>Grayscale</button>
			<button className={style.dropdownBtn}>Sepia</button>
			<button className={style.dropdownBtn}>Hue Rotate</button>
			<button className={style.dropdownBtn}>Blur</button>
		</div>
	)
}

export default ImageDropdown
