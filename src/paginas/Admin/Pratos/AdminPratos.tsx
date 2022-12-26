import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"


export default function AdminPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        try {
            http.get('pratos/')
                .then(resposta => setPratos(resposta.data))
        } catch (e) {
            console.log(e)
        }
    }, [])

    const excluir = (pratoParaExcluir: IPrato) => {
        try {
        http.delete(`pratos/${pratoParaExcluir.id}/`)
        .then(() => {
            const listaPratos = pratos.filter(prato => prato.id !== pratoParaExcluir.id)
            setPratos(listaPratos)
            alert('Prato excluído com sucesso!')
        }) } catch (e) {
            console.log(e)
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {pratos.map((prato) =>
                        <TableRow key={prato.id}>

                            <TableCell>
                                {prato.nome}
                            </TableCell>

                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>
                            </TableCell>

                            <TableCell>
                                <Link to={`/admin/pratos/${prato.id}`}>[Editar]</Link>
                            </TableCell>

                            <TableCell>
                                <Button onClick={() => excluir(prato)} color="error" variant="outlined">Excluir</Button>
                            </TableCell>

                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )

}