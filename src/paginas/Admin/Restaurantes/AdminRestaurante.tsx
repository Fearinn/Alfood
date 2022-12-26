import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"


export default function AdminRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        try {
            http.get('restaurantes/')
                .then(resposta => setRestaurantes(resposta.data))
        } catch (e) {
            console.log(e)
        }
    }, [])

    const excluir = (restauranteParaExcluir: IRestaurante) => {
        try {
        http.delete(`restaurantes/${restauranteParaExcluir.id}/`)
        .then(() => {
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id)
            setRestaurantes(listaRestaurantes)
            alert('Restaurante excluído com sucesso!')
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>[Editar]</Link>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => excluir(restaurante)} color="error" variant="outlined">Excluir</Button>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )

}