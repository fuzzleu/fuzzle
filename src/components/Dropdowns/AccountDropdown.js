import Link from "next/link"

const AccountDropdown = ({}) => {
	return (
		<div className={styles.dropdownBarOptions}>
			<Link href='/account'>
				<a className={styles.dropdownBarOption}>Account</a>
			</Link>
			<Link href={`/user/${user.name}`}>
				<a className={styles.dropdownBarOption}>Public profile</a>
			</Link>
			<button
				className={styles.dropdownBarOption}
				name='danger'
				onClick={() => logout()}
			>
				Logout
			</button>
		</div>
	)
}

export default AccountDropdown
