{{/*
Expand the name of the chart.
*/}}
{{- define "giga-helm.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "giga-helm.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "giga-helm.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "giga-helm.labels" -}}
helm.sh/chart: {{ include "giga-helm.chart" . }}
{{ include "giga-helm.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "giga-helm.selectorLabels" -}}
app.kubernetes.io/name: {{ include "giga-helm.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "giga-helm.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "giga-helm.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "api.fullname" -}}
{{- printf "%s-%s" .Release.Name "api" | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "api.labels" -}}
app.kubernetes.io/name: {{ include "api.fullname" . }}
helm.sh/chart: {{ include "giga-helm.chart" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "api.selectorLabels" -}}
app.kubernetes.io/name: {{ include "api.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "admin.fullname" -}}
{{- printf "%s-%s" .Release.Name "admin" | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "admin.labels" -}}
app.kubernetes.io/name: {{ include "admin.fullname" . }}
helm.sh/chart: {{ include "giga-helm.chart" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "admin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "admin.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "web.fullname" -}}
{{- printf "%s-%s" .Release.Name "web" | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "web.labels" -}}
app.kubernetes.io/name: {{ include "web.fullname" . }}
helm.sh/chart: {{ include "giga-helm.chart" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "web.selectorLabels" -}}
app.kubernetes.io/name: {{ include "web.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "deltasharing.fullname" -}}
{{- printf "%s-%s" .Release.Name "deltasharing" | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "deltasharing.labels" -}}
app.kubernetes.io/name: {{ include "deltasharing.fullname" . }}
helm.sh/chart: {{ include "giga-helm.chart" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "deltasharing.selectorLabels" -}}
app.kubernetes.io/name: {{ include "deltasharing.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "webhook.fullname" -}}
{{- printf "%s-%s" .Release.Name "webhook" | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{- define "webhook.labels" -}}
app.kubernetes.io/name: {{ include "webhook.fullname" . }}
helm.sh/chart: {{ include "giga-helm.chart" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "webhook.selectorLabels" -}}
app.kubernetes.io/name: {{ include "webhook.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}