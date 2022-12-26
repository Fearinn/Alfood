import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material";

import { Link as RouterLink, Outlet } from "react-router-dom";


export default function PaginaBaseAdmin () {
    return (
<>
            <AppBar sx={{position: "static"}}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: "flex", flexGrow: "1", justifyContent: "space-around"}}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ margin: "2rem 0", color: "white" }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ margin: "2rem 0", color: "white" }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ margin: "2rem 0", color: "white" }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ margin: "2rem 0", color: "white" }}>
                                    Novo Prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box >
                <Container maxWidth="lg" sx={{ marginTop: "1rem" }}>
                    <Paper sx={{ padding: "2rem" }}>
                        {/* conteúdo da página */}
                        <Outlet />
                    </Paper>
                </Container>
            </Box>

        </>
    )
}