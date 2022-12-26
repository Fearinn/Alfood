import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import http from '../../http';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { AxiosRequestConfig } from 'axios';
import IParamsAxios from '../../interfaces/IParamsAxios';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [pesquisa, setPesquisa] = useState('')
  const [ordenador, setOrdenador] = useState('')

  const sectionTop = useRef<HTMLElement>(null)

  const carregarPagina = (url: string, opcoes: AxiosRequestConfig = {}) => {
    try {
      http.get<IPaginacao<IRestaurante>>(url, opcoes)
        .then(resposta => {
          setRestaurantes([...resposta.data.results])
          setProximaPagina(resposta.data.next)
          setPaginaAnterior(resposta.data.previous)
          if (sectionTop.current) {
            sectionTop.current.scrollIntoView()
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  const buscar = () => {
    const opcoes = {params: {}} as IParamsAxios
    if (ordenador) {opcoes.params.ordering = ordenador}
    if (pesquisa) {opcoes.params.search = pesquisa}
    carregarPagina('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => carregarPagina('http://localhost:8000/api/v1/restaurantes/'), [])

  return (<section ref={sectionTop} className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>

    <Box sx={{ display: "flex", gap: "1rem", marginBottom: '0.5rem'}}>

      <TextField type="search" id="outlined-basic" label="Busca" variant="outlined"
        value={pesquisa} onChange={(evento) => setPesquisa(evento.target.value)} />

      <FormControl sx={{ width: "10%" }}>
        <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Ordenar"
          value={ordenador}
          onChange={(evento) => setOrdenador(evento.target.value)}
        >
          <MenuItem value={''}>Limpar</MenuItem>
          <MenuItem value={'nome'}>Nome</MenuItem>
          <MenuItem value={'id'}>Id</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={() => buscar()}>Ordenar</Button>

    </Box>
    {restaurantes?.filter(item => item.nome.toLowerCase()
      .includes(pesquisa.toLowerCase())).map(item => <Restaurante restaurante={item} key={item.id} />)}

    {paginaAnterior && <Button variant="contained" onClick={() => {
      carregarPagina(paginaAnterior)
    }} >Página anterior</Button>}

    {proximaPagina && <Button variant="contained" onClick={() => {
      carregarPagina(proximaPagina)
    }}>Próxima página</Button>}

  </section >)
}

export default ListaRestaurantes