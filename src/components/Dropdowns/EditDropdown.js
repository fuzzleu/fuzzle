import style from "styles/dropdown.module.scss"

const EditDropdown = ({ setDropdowns }) => {
	const closeDropdown = () =>
		setDropdowns((prevState) => {
			return {
				...prevState,
				edit: false,
			}
		})

	return (
		<div
			className={style.dropdown}
			name='edit'
			onMouseLeave={closeDropdown}
		>
			<button className={style.dropdownBtn}>Undo</button>
			<button className={style.dropdownBtn}>Cut</button>
			<button className={style.dropdownBtn}>Copy</button>
			<button className={style.dropdownBtn}>Paste</button>
			<button className={style.dropdownBtn}>Free Transform</button>
		</div>
	)
}

export default EditDropdown
