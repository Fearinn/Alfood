import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import http from "../../../http"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"
import { useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"


export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')

    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<ITag[]>([])

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState<string | number>('')

    const [imagem, setImagem] = useState<File | null>(null)

    const params = useParams()

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
    }, [])

    useEffect(() => {
        if (params.id) {
            http.get<IPrato>(`/pratos/${params.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                    setDescricao(resposta.data.descricao)
                    setTag(resposta.data.tag)
                    setRestaurante(resposta.data.restaurante)
                })
        }
    }, [params])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()

        formData.append("nome", nomePrato)
        formData.append("descricao", descricao)
        formData.append("tag", tag)
        formData.append("restaurante", restaurante.toString())

        if (imagem) {
            formData.append("imagem", imagem)
        }

        let [metodo, mensagem, parametro] = ['', '', '']

        if (params.id) {
            metodo = 'PUT'
            mensagem = 'Prato atualizado com sucesso'
            parametro = `${params.id}/`
            console.log(metodo)
        } else {
            metodo = 'POST'
            mensagem = 'Prato criado com sucesso'
        }

        http.request({
            url: `pratos/${parametro}`,
            method: metodo,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert(mensagem)
            })
            .catch(erro => console.log(erro))
    }


    return (

        <Box sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", flexGrow: "1"
        }}>

            <Typography component="h1" variant="h6">Formulário de pratos</Typography>
            <Box component="form" sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}
                onSubmit={aoSubmeterForm}>

                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    id="standard-basic" label="Nome do prato" variant="standard"
                    fullWidth required>
                </TextField>

                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    id="standard-basic" label="Descrição" variant="standard"
                    fullWidth required>
                </TextField>

                <FormControl fullWidth >
                    <InputLabel id="select-tag">Tag</InputLabel>

                    <Select required label="Tag" value={tag} labelId="select-tag" onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => (
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>)
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <InputLabel id="select-tag">Restaurante</InputLabel>

                    <Select required label="Restaurante" value={restaurante} labelId="select-tag" onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => (
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)
                        )}
                    </Select>

                </FormControl>

                <input type="file" accept="image/*" onChange={selecionarArquivo} />

                <Button fullWidth type="submit" variant="outlined">Confirmar</Button>
            </Box>

        </Box>)
}