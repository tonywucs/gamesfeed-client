import PreferenceList from '../PreferenceList/PreferenceList';

const PreferenceModal = ({ handleTogglePrefs, getPrefsOnAction, handleChangePrefs }: any) => {

    return (
        <>
            <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto z-[100] flex flex-col justify-between items-center py-4 h-[25rem] md:h-[27.5rem] w-[25rem] md:w-[27.5rem] bg-white dark:bg-stone-900 rounded-xl border-2 border-black">
                <h2 className="tableheader font-bold text-slate-300">Select YOUR Preferences</h2>
                <PreferenceList handleTogglePrefs={handleTogglePrefs} action={false} handleChangePrefs={handleChangePrefs} getPrefsOnAction={getPrefsOnAction}/>
            </section>
        </>
    );
};

export default PreferenceModal;