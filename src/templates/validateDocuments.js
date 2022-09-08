const { getTotal } = require('../utils')
const { getFormatedNumber, parseDate, getKPI, clearPhone } = require('../utils/transformData')

/* eslint-disable no-tabs */
const validateDocuments = ({ campaign }) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
							<tr><td align="center" valign="top" bgcolor="#ffffff" style="padding: 40px 30px 24px;">
								<img src="https://shareflow-statics.s3.amazonaws.com/shareflow.png" width="244" height="37" alt="" border="0" style="display: block;">
								<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
								<div>
									<table border="0" cellspacing="0" cellpadding="0" width="100%">
										<tr><td align="center" valign="top" height="49" style="padding: 17px 0px 0px; height: 49px;">
											<div style="line-height: 32px;">
												<span style="font-family: &quot;Cera Pro&quot;, sans-serif; font-weight: bold; font-size: 30px; color: #363a57;">¡Nueva orden de pedido generada!</span>
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
												<span style="font-family: Helvetica, sans-serif; font-size: 15px; color: #363a57;">¡Enhora buena! <br>
												<br>
													<span style="font-weight: normal;">${campaign?.user?.name}</span> ha generado una nueva orden de compra (con número #${campaign?.orderNumber}) para <span style="font-weight: normal;">${campaign?.brand}</span> por un valor de <span style="font-weight: normal;">$${getFormatedNumber(getTotal(campaign?.amount)?.total || 0)}</span> con el objetivo de <span style="font-weight: normal;">${campaign?.target?.name}</span>. <br>
													<br>Es importante que esta campaña se implemente lo más pronto posible ya que comienza el <span style="font-weight: normal;">${parseDate(campaign?.startDate)}</span> y finaliza el <span style="font-weight: normal;">${parseDate(campaign?.endDate)}</span>, además desea alcanzar un total de <span style="font-weight: normal;">${getFormatedNumber(getKPI(campaign?.publishers) || 0)}</span>. <br>
													<br>Adjunto encontrarás un PDF con el detalle de la compra, los medios, indicadores y costos para su correcta implementación u ordenación a los respectivos medios.<br>
													<br>
														<span style="font-weight: normal;">Sí encuentras algún error en el material creativo o requieres de hablar con el cliente puedes contactarlo a través del botón inferior. <br>
														</span>
														<br>Customer Success, <br>Shareflow. 🤙🏼</span>
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
														<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:36px;v-text-anchor:middle;width:285;" arcsize="56%" stroke="f" fillcolor="#1ed35c">
														<w:anchorlock>
														</w:anchorlock>
														<center style="color: #ffffff; font-size: 15px; font-weight: bold; font-family: Arial, sans-serif;">Contactar al Cliente vía WhatsApp</center>
														</v:roundrect>
														<![endif]-->
														<a target="_blank" href="https://wa.me/${clearPhone(campaign?.user?.phone)}" style="background-color:#1ed35c;font-size:15px;font-weight:bold;line-height:36px;width:285px;color:#ffffff;border-radius:20px;display:inline-block;font-family:Arial, sans-serif;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all">Contactar al Cliente vía WhatsApp</a>
													</div>
												</td></tr>
											</table>
										</div>
										<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
										<div style="line-height: 20px;">
											<span style="font-family: Helvetica, sans-serif; font-size: 12px; color: #363a57;">Por favor no intentes responder este correo electrónico. Los correos electrónicos enviados a esta dirección no se responderán.</span>
										</div>
										<div style="height: 16px; line-height: 16px; font-size: 14px;">&nbsp;</div>
										<div style="line-height: 12px;">
											<span style="font-family: &quot;Cera Pro&quot;, sans-serif; font-weight: bold; font-size: 8px; color: #363a57;">Shareflow® <span style="font-weight: normal;">es una marca registrada de Xpand Group S.A.S. Nit 901.012.073-8 <br>Carrera 48A #16 sur 86 Oficina 801 (Medellín, Col)</span>
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
			</html>
`

module.exports = { validateDocuments }
