import React, { useLayoutEffect, useRef, useState } from 'react'
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberInput,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stat,
	StatLabel,
	StatNumber,
	Text,
	Tooltip,
	useDisclosure
} from '@chakra-ui/core'

const Home: React.FC = () => {
	const progressRef = useRef(null)

	const [value, setValue] = useState(1045)
	const handleChangeValue = value => setValue(value)

	const [hour, setHour] = useState(220)
	const handleChangeHour = value => setHour(value)

	const [inss, setINSS] = useState(27.8)
	const handleChangeINSS = value => setINSS(value)

	const [fgts, setFGTS] = useState(8)
	const handleChangeFGTS = value => setFGTS(value)

	const { isOpen, onOpen, onClose } = useDisclosure()

	const decimoFerias = value / 12
	const umTercoFerias = decimoFerias / 3
	const avisoPrevio = (value * 8.33) / 100

	const tarifaINSS = (value * inss) / 100
	const decimoFeriasINSS = (decimoFerias * inss) / 100
	const umTercoFeriasINSS = (decimoFeriasINSS * inss) / 100

	const tarifaFGTS = (value * fgts) / 100
	const decimoFeriasFGTS = (decimoFerias * fgts) / 100
	const umTercoFeriasFGTS = (umTercoFerias * fgts) / 100
	const multaFGTS = tarifaFGTS + decimoFeriasFGTS * 2 + (umTercoFeriasFGTS * 50) / 100

	const total =
		(value * 100) / 100 +
		tarifaINSS +
		tarifaFGTS +
		decimoFerias * 2 +
		decimoFeriasINSS * 2 +
		decimoFeriasFGTS * 2 +
		umTercoFerias +
		umTercoFeriasINSS +
		umTercoFeriasFGTS +
		avisoPrevio +
		multaFGTS
	const porcentagemTotal = (total / value) * 100
	const descontos = total - value
	const porcentagemDescontos = (descontos / value) * 100
	const porHora = total / hour

	const [size, setSize] = useState(0)

	useLayoutEffect(() => {
		function updateSize() {
			setSize(progressRef.current.offsetWidth)
		}
		window.addEventListener('resize', updateSize)
		updateSize()

		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return (
		<Grid
			as="main"
			height="100vh"
			templateColumns="1fr 40rem 40rem 1fr"
			templateRows="10vh 1fr 10vh"
			templateAreas="
			'. . . .'
			'. a b .'
			'. . . .'
		"
			justifyContent="center"
			alignItems="center"
			bg="gray.800"
			display={{ xl: 'grid' }}
		>
			<Flex gridArea="a" flexDir="column" padding="1rem 1rem" margin="1rem 1rem">
				<Text
					fontSize="5xl"
					marginBottom="4rem"
					onClick={() => window.location.reload(false)}
					cursor="pointer"
				>
					ePayroll <Icon name="add" size="24px" color="green.500" />
				</Text>

				<FormControl>
					<FormLabel>Salário Bruto</FormLabel>
					<NumberInput
						min={1}
						precision={2}
						value={value}
						onChange={handleChangeValue}
						marginBottom="1rem"
					/>
					<Slider
						min={1}
						max={10000}
						step={10}
						value={value}
						onChange={handleChangeValue}
						marginBottom="1rem"
					>
						<SliderTrack />
						<SliderFilledTrack bg="green.500" />
						<SliderThumb />
					</Slider>

					<FormLabel>Carga Horária</FormLabel>
					<NumberInput
						min={1}
						precision={0}
						value={hour}
						onChange={handleChangeHour}
						marginBottom="1rem"
					/>
					<Slider
						min={1}
						max={730}
						step={1}
						value={hour}
						onChange={handleChangeHour}
						marginBottom="1rem"
					>
						<SliderTrack />
						<SliderFilledTrack bg="green.500" />
						<SliderThumb />
					</Slider>

					<Modal onClose={onClose} size="md" isOpen={isOpen} isCentered>
						<ModalOverlay />
						<ModalContent bg="gray.600" borderRadius="0.5rem">
							<ModalHeader>Configurações</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<FormLabel>Tarifa INSS</FormLabel>
								<NumberInput
									min={1}
									max={100}
									precision={2}
									value={inss}
									onChange={handleChangeINSS}
									marginBottom="1rem"
								/>
								<Slider
									min={1}
									max={100}
									step={0.5}
									value={inss}
									onChange={handleChangeINSS}
									marginBottom="1rem"
								>
									<SliderTrack />
									<SliderFilledTrack bg="green.500" />
									<SliderThumb />
								</Slider>

								<FormLabel>Tarifa FGTS</FormLabel>
								<NumberInput
									min={1}
									max={100}
									precision={2}
									value={fgts}
									onChange={handleChangeFGTS}
									marginBottom="1rem"
								/>
								<Slider min={1} max={100} step={0.5} value={fgts} onChange={handleChangeFGTS}>
									<SliderTrack />
									<SliderFilledTrack bg="green.500" />
									<SliderThumb />
								</Slider>
							</ModalBody>
							<ModalFooter>
								<Button
									onClick={() => {
										setINSS(27.8)
										setFGTS(8)
									}}
									marginRight="1rem"
								>
									Redefinir
								</Button>
								<Button onClick={onClose}>Cancelar</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>

					<Box>
						<Button
							size="md"
							onClick={() => {
								setValue(1045)
								setHour(220)
							}}
							marginRight="1rem"
						>
							Redefinir
						</Button>

						<IconButton aria-label="" icon="settings" size="md" w="2rem" onClick={onOpen} />
					</Box>
				</FormControl>
			</Flex>

			<Flex
				gridArea="b"
				flexDir="column"
				padding="1rem 1rem"
				margin="1rem 1rem"
				bg="gray.600"
				borderRadius="0.5rem"
				marginBottom={{ base: '5rem', xl: '1rem' }}
			>
				<Grid
					as="main"
					templateColumns="1fr 1fr"
					templateRows={{
						base: '10rem 16rem 13rem 3rem 3rem',
						sm: '8rem 11rem 9rem 3rem 3rem',
						md: '8rem 11rem 9rem 3rem 3rem',
						xl: '8rem 11rem 8rem 3rem 3rem'
					}}
					templateAreas="
						'tleft tright'
						'left right'
						'mleft mright'
						'bottom bottom'
						'progress progress'
					"
					padding="0.5rem 0.5rem"
				>
					<Flex gridArea="tleft" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								13º Salário E Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(decimoFerias * 2 * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								1/3 Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(umTercoFerias * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="left" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa INSS ({inss}%)
								<Tooltip
									aria-label=""
									label="Essa tarifa serve para que o empregado tenha acesso à aposentadoria e necessite, por exemplo, se ausentar do trabalho por uma questão de saúde."
									placement="right"
								>
									<Icon name="info" cursor="pointer" marginLeft="0.4rem" />
								</Tooltip>
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(tarifaINSS * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa INSS 13º e Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(decimoFeriasINSS * 2 * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa INSS 1/3 Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(umTercoFeriasINSS * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="mleft" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Custo Total
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(total * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Total de Descontos
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(descontos * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="tright" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Aviso Prévio
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(avisoPrevio * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Multa FGTS
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(multaFGTS * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="right" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa FGTS ({fgts}%)
								<Tooltip
									aria-label=""
									label="Essa tarifa serve para proteger o empregado demitido sem justa causa, mediante a abertura de uma conta vinculada ao contrato de trabalho."
									placement="right"
								>
									<Icon name="info" cursor="pointer" marginLeft="0.4rem" />
								</Tooltip>
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(tarifaFGTS * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa FGTS 13º e Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(decimoFeriasFGTS * 2 * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Tarifa FGTS 1/3 Férias
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(umTercoFeriasFGTS * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="mright" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Porcentagem do Custo Total
							</StatLabel>
							<StatNumber fontSize="xl">
								{(Math.round(porcentagemTotal * 100) / 100).toFixed(2).replace('.', ',')}%
							</StatNumber>
						</Stat>

						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Porcentagem do Total de Descontos
							</StatLabel>
							<StatNumber fontSize="xl">
								{(Math.round(porcentagemDescontos * 100) / 100).toFixed(2).replace('.', ',')}%
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex gridArea="bottom" flexDir="column">
						<Stat>
							<StatLabel fontSize="sm" color="gray.300">
								Custo por Hora
							</StatLabel>
							<StatNumber fontSize="xl">
								R${(Math.round(porHora * 100) / 100).toFixed(2).replace('.', ',')}
							</StatNumber>
						</Stat>

						<Divider />
					</Flex>

					<Flex ref={progressRef} gridArea="progress" marginTop="2rem">
						<Tooltip
							aria-label=""
							label={`Salário: ${(Math.round(value * 100) / total).toFixed(2).replace('.', ',')}%`}
							placement="top"
						>
							<Box
								w={(size * value) / total}
								bg="red.500"
								borderTopLeftRadius="24px"
								borderBottomLeftRadius="24px"
							/>
						</Tooltip>

						<Tooltip
							aria-label=""
							label={`INSS: ${(
								Math.round((tarifaINSS + decimoFeriasINSS * 2 + umTercoFeriasINSS) * 100) / total
							)
								.toFixed(2)
								.replace('.', ',')}%`}
							placement="top"
						>
							<Box
								w={(size * (tarifaINSS + decimoFeriasINSS * 2 + umTercoFeriasINSS)) / total}
								bg="yellow.500"
							/>
						</Tooltip>

						<Tooltip
							aria-label=""
							label={`FGTS: ${(
								Math.round(
									(tarifaFGTS + decimoFeriasFGTS * 2 + umTercoFeriasFGTS + multaFGTS) * 100
								) / total
							)
								.toFixed(2)
								.replace('.', ',')}%`}
							placement="top"
						>
							<Box
								w={
									(size * (tarifaFGTS + decimoFeriasFGTS * 2 + umTercoFeriasFGTS + multaFGTS)) /
									total
								}
								bg="green.500"
							/>
						</Tooltip>

						<Tooltip
							aria-label=""
							label={`13º e Férias: ${(Math.round((decimoFerias * 2 + umTercoFerias) * 100) / total)
								.toFixed(2)
								.replace('.', ',')}%`}
							placement="top"
						>
							<Box w={(size * (decimoFerias * 2 + umTercoFerias)) / total} bg="blue.500" />
						</Tooltip>

						<Tooltip
							aria-label=""
							label={`Aviso Prévio: ${(Math.round(avisoPrevio * 100) / total)
								.toFixed(2)
								.replace('.', ',')}%`}
							placement="top"
						>
							<Box
								w={(size * avisoPrevio) / total}
								bg="purple.500"
								borderTopRightRadius="24px"
								borderBottomRightRadius="24px"
							/>
						</Tooltip>
					</Flex>
				</Grid>
			</Flex>
		</Grid>
	)
}

export default Home
