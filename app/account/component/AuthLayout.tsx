export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-center my-24 px-4">
			<div className="max-w-md w-full">{children}</div>
		</div>
	);
}
