{{/*
Expand the name of the chart.
*/}}
{{- define "giga-blocks.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "giga-blocks.fullname" -}}
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
{{- define "giga-blocks.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "giga-blocks.labels" -}}
helm.sh/chart: {{ include "giga-blocks.chart" . }}
{{ include "giga-blocks.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "giga-blocks.selectorLabels" -}}
app.kubernetes.io/name: {{ include "giga-blocks.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common web labels
*/}}
{{- define "giga-blocks-web.labels" -}}
helm.sh/chart: {{ include "giga-blocks.chart" . }}
{{ include "giga-blocks-web.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
web Selector labels
*/}}
{{- define "giga-blocks-web.selectorLabels" -}}
app.kubernetes.io/name: {{ include "giga-blocks.name" . }}-web
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common admin labels
*/}}
{{- define "giga-blocks-admin.labels" -}}
helm.sh/chart: {{ include "giga-blocks.chart" . }}
{{ include "giga-blocks-admin.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
web Selector labels
*/}}
{{- define "giga-blocks-admin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "giga-blocks.name" . }}-admin
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}



