type Props = {
    name: string;
    buttonComponent?: any; // Corrected spelling from buttonCompoent
    isSmallText?: boolean;
}

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${isSmallText ? 'text-sm' : 'text-2xl'} dark:text-white`}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    );
};

export default Header;
