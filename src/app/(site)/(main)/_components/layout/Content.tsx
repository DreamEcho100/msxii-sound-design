import {type PropsWithChildren } from 'react'


export default function MainContent(props: PropsWithChildren) {
	return (
		<main className="mx-auto mt-main-header-h flex w-full max-w-main flex-grow flex-col">
        {props.children}
      </main>
	)
}