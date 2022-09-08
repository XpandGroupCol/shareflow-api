const { getTotal } = require('../utils')
const { getFormatedNumber, parseDate, parseUTCDate } = require('../utils/transformData')

/* eslint-disable no-tabs */
const implementation = ({ campaign }) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<!--[if gte mso 9]>
		<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
		<meta name="x-apple-disable-message-reformatting">
		<title>Ampier</title>
		<style>html{-webkit-text-size-adjust:none;-ms-text-size-adjust:none}@media only screen and (max-device-width:600px),only screen and (max-width:600px){.mob_100{width:100%!important;max-width:100%!important}.mob_full{width:auto!important;display:block!important;padding:0 10px!important}.mob_center{text-align:center!important}.mob_center_bl{margin-left:auto;margin-right:auto}.mob_hidden{display:none!important}.only_mob{display:block!important}}@media only screen and (max-width:600px){.mob_100{width:100%!important;max-width:100%!important}.mob_full{width:auto!important;display:block!important;padding:0 10px!important}.mob_center{text-align:center!important}.mob_center_bl{margin-left:auto;margin-right:auto}.mob_hidden{display:none!important}.only_mob{display:block!important}}.creative{width:100%!important;max-width:100%!important}.mail_preheader{display:none!important}form input, form textarea{font-family: Arial, sans-serif;width: 100%;box-sizing: border-box;font-size: 13px;color:#000000;outline:none;padding: 0px 15px;}form textarea{resize:vertical;line-height: normal;padding: 10px 15px;}form button{border: 0px none;cursor:pointer;}</style>
		<style>@media only screen and (max-width:480px){u+.body .full-wrap{width:100%!important;width:100vw!important}}</style>
		<style>@-ms-viewport{width:device-width}</style>
		<!--[if (gte mso 9)|(IE)]>
		<style type="text/css">table {border-collapse: collapse !important;}.outf14{font-size:14px !important;}    </style>
		<![endif]-->
	</head>
	<body style="padding:0;margin:0">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="full-wrap">
			<tr><td align="center" bgcolor="#f0f0f0" style="line-height: normal; hyphens: none;">
				<div>
					<!--[if !mso]>
					<!-->
					<div class="mail_preheader" style="font-size: 0px; color: transparent; opacity: 0;">
						<span style="font-family: Arial, Helvetica, sans-serif; font-size: 0px; color: transparent; line-height: 0px;">
							</span>
							<!---->
						</div>
						<!--<![endif]-->
					</div>
					<div>
						<!--[if (gte mso 9)|(IE)]>
						<table width="600" border="0" cellspacing="0" cellpadding="0" style="width: 600px;">
						<tr><td>
						<![endif]-->
						<table border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px;">
							<tr><td align="center" valign="top" bgcolor="#8116f2" style="padding: 40px 30px 24px;">
								<img src="https://shareflow-statics.s3.amazonaws.com/logo-white.png" width="250" height="38" alt="" border="0" style="display: block;">
								<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
								<div>
									<table border="0" cellspacing="0" cellpadding="0" width="100%">
										<tr><td align="center" valign="top" height="95" style="padding: 17px 0px 0px; height: 95px;">
											<div style="line-height: 32px;">
												<span style="font-family: &quot;Cera Pro&quot;, sans-serif; font-weight: bold; font-size: 30px; color: #ffffff;">${campaign?.user?.name}, tu campaña se encuentra en proceso de implementación!</span>
											</div>
										</td></tr>
									</table>
								</div>
								<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
								<div>
									<!--[if (gte mso 9)|(IE)]>
									<table width="540" border="0" cellspacing="0" cellpadding="0" style="width: 540px;">
									<tr><td>
									<![endif]-->
									<table border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 540px;">
										<tr><td align="left">
											<div style="line-height: 20px;">
												<span style="font-family: Helvetica, sans-serif; font-size: 15px; color: #ffffff;">Te contamos que se ha registrado en nuestra plataforma la orden de compra <span style="font-weight: normal;">número #${campaign?.orderNumber} </span>
												<span style="font-weight: normal;">el día </span>
												<span style="font-weight: normal;">${parseDate(campaign?.createdAt)}</span>
												<span style="font-weight: normal;">a las </span>
												<span style="font-weight: normal;">${parseUTCDate(campaign?.createdAt, 'hh:mm A')}</span>
												<span style="font-weight: normal;">por un valor de</span>
												<span style="font-weight: normal;"> $${getFormatedNumber(getTotal(campaign?.amount)?.total || 0)} COP (IVA Incluído). <br>
												<br>
												</span>
												<span style="font-weight: normal;">Tu campaña comienza el día </span>
												<span style="font-weight: normal;">${parseDate(campaign?.startDate)}</span>
												<span style="font-weight: normal;">y finaliza el día </span>
												<span style="font-weight: normal;">${parseDate(campaign?.endDate)}. </span>
												<span style="font-weight: normal;">Adjunto encontrarás un PDF con el detalle de tu compra, los medios, indicadores, y costos.<br>
												<br>Recuerda que a través de </span>
												<a href='https://shareflow.me/' target="_blank" style="font-weight: normal; color: #ffffff;">www.shareflow.me </a>
												<span style="font-weight: normal;">podrás crear las campañas que desees. Si necesitas tu </span>
												<span style="font-weight: normal;">Factura Electrónica</span>
												<span style="font-weight: normal;"> debes hacer click en el siguiente botón y completar los datos de tu empresa. <br>
												<br>Equipo Shareflow. 🤙🏼</span>
											</span>
										</div>
										<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
									</td></tr>
								</table>
								<!--[if (gte mso 9)|(IE)]>
								</td></tr>
								</table>
								<![endif]-->
							</div>
							<div>
								<table border="0" cellspacing="0" cellpadding="0" width="100%">
									<tr><td align="center" valign="top" style="padding: 24px;">
										<div>
											<!--[if mso]>
											<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:36px;v-text-anchor:middle;width:247;" arcsize="56%" stroke="f" fillcolor="#ffffff">
											<w:anchorlock>
											</w:anchorlock>
											<center style="color: #363a57; font-size: 15px; font-weight: bold; font-family: Arial, sans-serif;">Necesito Factura Electrónica</center>
											</v:roundrect>
											<![endif]-->
											<a target="_blank" href="mailto:invoicing@shareflow.me?subject=factura electrónica&body=Hola me gustaría tener la factura electrónica de la orden #${campaign?.orderNumber}" 
											style="background-color:#ffffff;font-size:15px;font-weight:bold;line-height:36px;width:247px;color:#363a57;border-radius:20px;display:inline-block;font-family:Arial, sans-serif;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all">Necesito Factura Electrónica</a>
										</div>
									</td></tr>
								</table>
							</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div>
								<table border="0" cellspacing="0" cellpadding="0" width="100%">
									<tr><td align="center" valign="top">
										<div style="line-height: 30px;">
											<span style="font-family: &quot;Cera Pro&quot;, sans-serif; font-weight: bold; font-size: 30px; color: #ffffff;">¿Quieres aumentar tus ventas hasta 24X? 🔥</span>
										</div>
										<div style="height: 15px; line-height: 15px; font-size: 13px;">&nbsp;</div>
										<div style="line-height: 20px;">
											<span style="font-family: Helvetica, sans-serif; font-size: 15px; color: #ffffff;">Sí tu objetivo de <span style="font-weight: normal;">Visibilidad de marca</span> no es suficiente, tenemos un equipo especializado en <span style="font-weight: normal;">conversión</span>. Con este equipo podrás maximizar el desempeño de tu negocio y aumentar el <span style="font-weight: normal;">ROI, </span>disminuir el <span style="font-weight: normal;">Costo de Adquisición de Cliente </span>y ser más<span style="font-weight: normal;">
											</span>
											<span style="font-weight: normal;">rentable.</span>
											</span>
										</div>
										<div style="height: 15px; line-height: 15px; font-size: 13px;">&nbsp;</div>
										<div>
											<!--[if mso]>
											<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:36px;v-text-anchor:middle;width:197;" arcsize="56%" stroke="f" fillcolor="#ffffff">
											<w:anchorlock>
											</w:anchorlock>
											<center style="color: #363a57; font-size: 15px; font-weight: bold; font-family: &quot;Cera Pro&quot;, sans-serif;">Contactar con ventas.</center>
											</v:roundrect>
											<![endif]-->
											<a target="_blank" href="https://calendly.com/camilo-orozco/shareflow-grow-up" style="background-color:#ffffff;font-size:15px;font-weight:bold;line-height:36px;width:197px;color:#363a57;border-radius:20px;display:inline-block;font-family:Cera Pro, sans-serif;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all">Contactar con ventas.</a>
										</div>
									</td></tr>
								</table>
							</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div>
								<table border="0" cellspacing="0" cellpadding="0" width="100%">
									<tr><td align="left" valign="top" style="padding: 24px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr><td align="right" valign="top" style="font-size: 0px;">
												<div style="display: inline-block; vertical-align: top; width: 100%; max-width: 306px;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
														<tr><td align="left" valign="top" class="outf14" style="font-size: large;">
															<div>
																<!--[if (gte mso 9)|(IE)]>
																<table width="306" border="0" cellspacing="0" cellpadding="0" style="width: 306px;">
																<tr><td>
																<![endif]-->
																<table border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 306px;">
																	<tr><td align="left" valign="top">
																		<div style="height: 8px; line-height: 8px; font-size: 6px;">&nbsp;</div>
																		<div style="line-height: 20px;">
																			<span style="font-family: Helvetica, sans-serif; font-size: 15px; color: #ffffff;">¿Necesitas ayuda?, escríbenos a 
																			<a target="_blank" href="mailto:support@shareflow.me" style="font-weight: normal;color: #ffffff;">support@shareflow.me</a>
																			</span>
																		</div>
																	</td></tr>
																</table>
																<!--[if (gte mso 9)|(IE)]>
																</td></tr>
																</table>
																<![endif]-->
															</div>
														</td></tr>
													</table>
												</div>
												<!--[if (gte mso 9)|(IE)]>
												</td>
												<td valign="top" width="186" style="width: 186px">
												<![endif]-->
												<div style="display: inline-block; vertical-align: top; width: 186px;">
													<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
														<tr><td align="left" valign="top" class="outf14" style="font-size: large;">
															<div>
																<!--[if (gte mso 9)|(IE)]>
																<table width="186" border="0" cellspacing="0" cellpadding="0" style="width: 186px;">
																<tr><td>
																<![endif]-->
																<table border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 186px;">
																		<tr><td align="left" valign="top">
																			<table border="0" cellspacing="0" cellpadding="0" width="176" style="width: 176px;">
																				<tr>
																				<td align="left" valign="middle" style="padding: 0px 10px 0px 0px;">
																					<a href='https://www.facebook.com/Shareflow.me/' target='_blank'>
																						<img src="https://shareflow-statics.s3.amazonaws.com/facebook.png" width="32" height="32" alt="" border="0" style="display: block;">
																					</a>
																				</td>
																				<td align="left" valign="middle" style="padding: 0px 10px 0px 0px;">
																					<a href='https://www.instagram.com/shareflow.me/' target='_blank'>	
																						<img src="https://shareflow-statics.s3.amazonaws.com/instagram.png" width="32" height="32" alt="" border="0" style="display: block;">
																					</a>
																				</td>
																				<td align="left" valign="middle">
																					<a href=' https://www.youtube.com/channel/UCmN8mWbmVXSXSySMDGxX6Cw' target='_blank'>
																						<img src="https://shareflow-statics.s3.amazonaws.com/youtube.png" width="32" height="32" alt="" border="0" style="display: block;">
																					</a>
																				</td>
																				</tr>
																			</table>
																		</td></tr>
																	</table>
																<!--[if (gte mso 9)|(IE)]>
																</td></tr>
																</table>
																<![endif]-->
															</div>
														</td></tr>
													</table>
												</div>
											</td></tr>
										</table>
									</td></tr>
								</table>
							</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div style="line-height: 20px;">
								<span style="font-family: Helvetica, sans-serif; font-size: 12px; color: #ffffff;">Por favor no intentes responder este correo electrónico. Los correos electrónicos enviados a esta dirección no se responderán.</span>
							</div>
							<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
							<div style="line-height: 12px;">
								<span style="font-family: &quot;Cera Pro&quot;, sans-serif; font-weight: bold; font-size: 8px; color: #ffffff;">Shareflow® <span style="font-weight: normal;">es una marca registrada de Xpand Group S.A.S. Nit 901.012.073-8 <br>Carrera 48A #16 sur 86 Oficina 801 (Medellín, Col)</span>
								</span>
							</div>
						</td></tr>
					</table>
					<!--[if (gte mso 9)|(IE)]>
					</td></tr>
					</table>
					<![endif]-->
				</div>
			</td></tr>
		</table>
	</body>
</html>`

module.exports = { implementation }
