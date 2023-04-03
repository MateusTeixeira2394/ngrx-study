export default interface Ground{
    known: boolean;
    isMine: boolean;
    isFlag?: boolean;
    minesAround: number;
}