import style from "../../styles/app.module.scss"
import { Cursor } from "../../lib/icons/Misc"

const AppCol = () => {
	return (
		<div className={style.headCol}>
			<button className={`${style.headColBtn} ${style.active}`}>
				<Cursor />
			</button>
		</div>
	)
}

export default AppCol
